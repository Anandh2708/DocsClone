import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  showError = false;
  movie?:Movie;
  id:string='';
  error?:string;
  constructor(private router:Router,
    @Inject("MovieService") private movieService:MovieService,
    private activatedRoute: ActivatedRoute,) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params=>{
      this.id=params['id'];
      console.log(this.activatedRoute)
      this.movieService
          .getMovieById(this.id!)
          .subscribe({
            next: movie=>{
              this.movie=movie;
              console.log('movie',movie)
              this.error=undefined;
            },
            error: error=>{
              console.log('in get movie by Id subscription error:',error.status); 
              if(error.status==404)
                this.error=`Invalid id ${this.id}`;
              else if (error.status==0)
                this.error="Couldn't connect to the server";
            }
          })

    })
    
  }
  errors?:any;
  errorTitle='';
  errorMessage='';

onPressingOk(){
  this.showError = false;
}
  async onSave(){
   
    this
      .movieService
      .updateMovie(this.movie!)
      .subscribe({
        next: movie=>{
          console.log('movie updated ',this.movie);
          this.errors=undefined;
          this.router.navigate(['/movie/details',this.movie!.id]);
        },

        error: err=>{
          console.log('movie update failed',err);
          // if(err.status==401){
          //   this.errorTitle="Un Authorized";
          //   this.errorMessage="You Need to Login to Update an author";
          // } else 
          if (err.status==400){
            this.showError = true
            this.errorTitle="Bad Request";
            this.errorMessage='';
          }
          else{
            this.errorTitle='';
            this.errorMessage='';
          } 
        }
      })
   
  }
  

}
