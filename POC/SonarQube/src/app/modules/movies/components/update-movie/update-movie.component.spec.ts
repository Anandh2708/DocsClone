import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// import { AppRoutingModule } from '../../app-routing.module';
import { HttpMovieService } from '../../services/http-movie-service';
import { MovieService } from '../../services/movie-service';
import { throwError ,of } from 'rxjs';
import { UpdateMovieComponent } from './update-movie.component';
import { ActivatedRoute } from '@angular/router';
import { movieMock } from '../../test-data/db-movies';
import { MovieRoutingModule } from '../../movies-routing.module';
import { HttpUserService } from '../../../users/services/http-user-service';
import { AppRoutingModule } from '../../../../app-routing.module';

describe('UpdateMovieComponent', () => {
  let component: UpdateMovieComponent;
  let fixture: ComponentFixture<UpdateMovieComponent>;
  let movieServiceSpy:jasmine.SpyObj<MovieService>; 
  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService',['getMovieById','updateMovie'])
    await TestBed.configureTestingModule({
      declarations: [ UpdateMovieComponent ],
      providers:[
        {provide:"UserService",useClass:HttpUserService},
        {
          provide : "MovieService",
          useValue : movieServiceSpy
        }
      ],
      imports:[
        HttpClientModule,
        AppRoutingModule,
        MovieRoutingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should handle error for status code 0',()=>
  {
    var error:any = new HttpErrorResponse({status:0});
    movieServiceSpy.getMovieById.and.returnValue(throwError(()=>error));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBe("Couldn't connect to the server");
  });
  it('should throw error for status code 404',()=>
  {
    var error:any = new HttpErrorResponse({status:404});
    component.id="abc"
    movieServiceSpy.getMovieById.and.returnValue(throwError(()=>error));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBe(`Invalid id ${component.id}`);
  });

  it('should give movie for valid movie id',()=>
  {
    var movie = movieMock;
    component.id=movie.id
    movieServiceSpy.getMovieById.and.returnValue(of(movie));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.error).toBeUndefined();
    expect(component.movie).toBe(movieMock);
  });

  it('should set onSave to be true',()=>
  {
    expect(component.onSave).toBeTruthy;
  });
  it('should',()=>
  {
    component.movie = movieMock;
    movieServiceSpy.updateMovie.and.returnValue(of(movieMock));
    component.onSave();
    fixture.detectChanges();

    expect(component.movie.cast).toBe(movieMock.cast);

  });

  it('should throw 400 for bad request',()=>
  {
    var error: any = new HttpErrorResponse({status:400});
    component.movie = movieMock;
    movieServiceSpy.updateMovie.and.returnValue(throwError(()=>error));
    component.onSave();
    fixture.detectChanges();

    expect(component.errorTitle).toBe('Bad Request');
  });
  


});
 