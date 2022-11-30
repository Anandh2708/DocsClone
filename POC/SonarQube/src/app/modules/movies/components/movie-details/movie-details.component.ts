import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../bookings/services/booking-service';
import { BookingInfo } from '../../../bookings/models/booking';
import { UserService } from '../../../users/services/user-service';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie-service';
import { LoggedInDetails } from '../../../users/models/user';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  id?:string; 
  movie:Movie|null|undefined=null;
  error?:string;
  showDeleteDialog=false;
  showBookDialog=false;
  showPaymentDialog=false;
  showLessSeatsDialog=false;
  form:FormGroup;
  ticketsBooked?:number;
  totalAmount?:number;
  user?:LoggedInDetails;
  bookingInfo?:BookingInfo;



  constructor(
    @Inject("MovieService") private movieService: MovieService,
    @Inject("BookingService") private bookingService: BookingService,
    @Inject("UserService") private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private builder :FormBuilder
  ) {
    this.form=this.builder.group({
      tickets: [0,[Validators.required, Validators.max(this.movie?.availableSeats!)]],
    });
    
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params=>{
      this.id=params['id'];
            this.movieService
          .getMovieById(this.id!)
          .subscribe({
            next: movie=>{
              this.movie=movie;
              this.error=undefined;
            },
            error: error=>{
              console.log('in get movie by Id subscription error:',error.status); 
              if(error.status==404)
                this.error=`Invalid id ${this.id}`;
              else if (error.status==0)
                this.error="Couldn't connect to the server";
              this.movie=undefined; //NOT Found
            }
          })
    });
    console.log(this.activatedRoute);

  }

  handleShowDeleteDialog(){
    this.showDeleteDialog=true;
    console.log('show delete dialog changed to ', this.showDeleteDialog);
  }

  handleDelete(confirmation:boolean){
    this.showDeleteDialog=false;
    if(!confirmation)
      return;
    this
      .movieService
      .removeMovie(this.movie!.id!)
      .subscribe({
        next: response=> { this.router.navigate(['/movie/list'])},
        error: err=>{ 
          console.log('error',err);  
        } 
      })
  }

  handleShowBookDialog(){
    this.showBookDialog=true;
  }
  handleLess(confirmation:boolean){
    this.showLessSeatsDialog=false;
    }

  calculateAmount(ticketsBooked:number,ticketPrice:number):number{
    return ticketsBooked * ticketPrice;
  }
  
  handleBook(confirmation:boolean){
    if(!confirmation)
    {
        this.showBookDialog=false;
        return;
    }
      // this.showBookDialog=false;
      this.ticketsBooked = this.form.value.tickets;
    if(this.ticketsBooked!<= this.movie?.availableSeats! && this.ticketsBooked!>0){
        this.totalAmount = this.calculateAmount(this.ticketsBooked!,this.movie?.ticketPrice!);
        this.showPaymentDialog=true;
    }
    else{
        console.log("tickets not available");
        this.showLessSeatsDialog=true;
    }
  }

  handlePayment(confirmation:boolean){
    this.showPaymentDialog=false;
    console.log(this.ticketsBooked);
    console.log(this.totalAmount);
    console.log("payment made")
    this.user = this.userService.getLoggedInUser();

    //console.log(this.user = JSON.parse(user!);

    if(this.user)

      console.log(this.user.user.email);

    this.bookingInfo = {

      movieId: this.movie?.id!,

      userEmail: this.user!.user.email,

      seatsBooked: this.ticketsBooked!,

      totalAmount: this.totalAmount!,

    };

    console.log(this.bookingInfo);

    this.bookingService.addBooking(this.bookingInfo!)

    .subscribe({

      next: booking=>{

        console.log(booking);

      }});
window.location.reload()
  

  }

  

}
