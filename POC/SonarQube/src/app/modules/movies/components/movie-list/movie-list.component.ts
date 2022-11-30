import { Component, Inject, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  search:string = "";
  movies ?: Movie[] 
  
  constructor(@Inject("MovieService") private movieService:MovieService) { }

  ngOnInit(): void {
    // console.log(this.movies);
    console.log('fetching movies');
    this
        .movieService.getAllMovies()
        .pipe(
            catchError((error:any) =>{
                console.log('error in getAllBooks',error.message);
                return throwError(()=>error);
            })
        )
        .subscribe((movies:any)=>{
            this.movies=movies;
        });
  }

}
