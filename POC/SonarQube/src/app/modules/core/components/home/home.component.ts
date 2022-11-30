import { Component, Inject, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MovieService } from '../../../movies/services/movie-service';
import { Movie } from '../../../movies/models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
