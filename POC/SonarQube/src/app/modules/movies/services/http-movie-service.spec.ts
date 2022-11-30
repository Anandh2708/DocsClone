import {  TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpMovieService } from './http-movie-service';
import { MovieService } from './movie-service';
import { movieMock, movies } from '../test-data/db-movies';
import { HttpUserService } from '../../users/services/http-user-service';
import { Movie } from '../models/Movie';

const url='http://localhost:5167/api/movie';

 describe('HttpMovieService', () => {
  let httpTestingController: HttpTestingController;
  let service:MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide:"MovieService", useClass:HttpMovieService},
    {provide:"UserService",useClass:HttpUserService}]
    })

   
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HttpMovieService);
    
  });


  it('should get all movies', () => {
    service.getAllMovies()
        .subscribe( (AllMovies) => {
            expect(AllMovies).toBeTruthy();
            console.log("Movies", movies);
            expect(AllMovies.length).toBe(movies.length);
            
        });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("GET");
    req.flush(movies);
});

it('should get a movie by id', () => {
    service.getMovieById(movies[0].id)
        .subscribe(movie =>{
            expect(movie).toBeTruthy();
            expect(movie.id).toEqual(movies[0].id);
        });
    const req = httpTestingController.expectOne(`${url}/${movies[0].id}`);
    expect(req.request.method).toEqual("GET");
    req.flush(movies[0]);
});

it('should update a movie by id', () => {
    service.updateMovie(movieMock)
        .subscribe((movie) =>{
            expect(movie).toBeTruthy();
            expect(movie.musicDirector).toEqual(movieMock.musicDirector);
        })
    
    const req = httpTestingController.expectOne(`${url}/${movieMock.id}`);
   
    expect(req.request.method).toEqual("PUT");
    req.flush(movieMock);
});

it('should add a movie', () => {
    service.addMovie(movieMock)
        .subscribe(movie =>{
            expect(movie).toBeTruthy();
            expect(movie.id).toEqual(movieMock.id);
        })
    
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual("POST");
    req.flush(movieMock);
});

it('should delete a movie by id', () => {
    service.removeMovie(movies[0].id)
        .subscribe(result =>{
            expect(result).toBeNull();
            console.log("result", result);
        });       
    const req = httpTestingController.expectOne(`${url}/${movies[0].id}`);
    expect(req.request.method).toEqual("DELETE");
    req.flush(null);

});


afterEach(() => {

    httpTestingController.verify();
});


});


 