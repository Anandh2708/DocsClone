import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/Movie';

import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie!:Movie;

  
  constructor(
    @Inject("MovieService") private movieService:MovieService, private router:Router
  ) {
    this.movie={
      id: '',
      name: '',
      poster: '',
      cast: '',
      director:'',
      musicDirector: '',
      synopsis: '',
      genre: '',
      rating: 0,
      language: '',
      releaseDate: undefined,
      duration: undefined ,
      ticketPrice: 0,
      availableSeats: 0,
      totalSeats: 0,
      certificate:""
    }
   }

  ngOnInit(): void {
    console.log(" inside add movie",this.movie);
  }
  
  async onSave()
  {
    
    console.log("movie add",this.movie);
    this
      .movieService
      .addMovie(this.movie)
      .subscribe({
        next: movie=>{
          console.log('Movie added ',movie);
          this.router.navigate([`/movie/details/${movie.id}`]);
        },
      })
  
  }
 
    
    


}
