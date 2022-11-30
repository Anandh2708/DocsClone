import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { UserService } from "../../users/services/user-service";
import { Movie } from "../models/Movie";
import { MovieService } from "./movie-service";

const url='http://localhost:5167/api/movie';

@Injectable({
    providedIn:"root"    
})
export class HttpMovieService implements MovieService {

    constructor(
        private http: HttpClient,
        @Inject("UserService") private userService: UserService
    ){  }
    getRandomMovie(): Observable<Movie> {return this
        .getAllMovies()
        .pipe<Movie>(
            map(movies=>this._getRandomMovie(movies))
        )
    }


    _getRandomMovie(movies:Movie[]):Movie{
        var index  =Math.floor(Math.random()*movies.length)
        return movies[index];
    }

    getAllMovies(): Observable<Movie[]> {
        return this
                    .http
                    .get<Movie[]>(url);
    }

    getMovieById(movieId: string): Observable<Movie> {
        return this
                    .http
                    .get<Movie>(`${url}/${movieId}`);
    }

    addMovie(movie: Movie): Observable<Movie> {
        return this
                .http
                .post<Movie>(url,movie);//, this.options );
    }

    removeMovie(movieId: string): Observable<void> {
        return this
                    .http
                    .delete<void>(`${url}/${movieId}`,this.options);
    }
    
    updateMovie(movie: Movie): Observable<Movie> {
        return this
                    .http
                    .put<Movie>(`${url}/${movie.id}`, movie);
    }

    

    
    get options(){
        return {
            headers: this.userService.getAuthenticationHeader()
        }
    }

    
    _handleError(error:HttpErrorResponse){
        
        console.log('error adding movie', error);
        return throwError(()=> error); //else let the error go        
    }
    
    
    
}