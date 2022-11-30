import { Observable } from "rxjs";
import { Movie } from "../models/Movie";

export interface MovieService{

    getAllMovies():Observable<Movie[]>;
    getMovieById(movieId:string):Observable<Movie>;
    addMovie(movie:Movie):Observable<Movie>;
    removeMovie(movieId:string):Observable<void>;
    updateMovie(movie:Movie):Observable<Movie>;
    getRandomMovie():Observable<Movie>;
}