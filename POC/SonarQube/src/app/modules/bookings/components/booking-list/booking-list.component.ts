import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../../../users/services/user-service';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  constructor(
    @Inject("UserService") private userService:UserService,
    @Inject("BookingService") private bookingService:BookingService,
    
    private router:Router,
  ) { }
  bookings!:Booking[];
  bookingtoBeCancelled!:Booking;
  ngOnInit(): void {
    console.log('fetching Bookings');
    var user = this.userService.getLoggedInUser();
    var userId = user?.user.email;
    this
        .bookingService.getbookingByUserId(userId!)
        .pipe(
            catchError((error:any) =>{
                console.log('error in getAllBooks',error.message);
                return throwError(()=>error);
            })
        )
        .subscribe((bookings:Booking[])=>{
            this.bookings=bookings;
            console.log("bookings",this.bookings);
        });
      
  }
  showCancelDialog:boolean=false;

  handleCancel(confirmation:boolean){
    console.log("bookings to be deleted",this.bookingtoBeCancelled);
    this.showCancelDialog=false;
    
    if(!confirmation)
      return;
    this
      .bookingService
      .removeBooking(this.bookingtoBeCancelled!.id!)
      .subscribe({
        next: response=> { this.router.navigate(['/booking/list'])},
        error: err=>{ 
          console.log('error',err);  
        } 
      })
window.location.reload();

  }


}

