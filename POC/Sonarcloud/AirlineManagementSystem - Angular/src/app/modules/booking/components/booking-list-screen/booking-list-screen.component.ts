import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../user/models/user';
import { UserService } from '../../../user/services/user-service';
import { Booking } from '../../models/booking';

@Component({
  selector: 'booking-list-screen',
  templateUrl: './booking-list-screen.component.html',
  styleUrls: ['./booking-list-screen.component.css']
})
export class BookingListScreenComponent implements OnInit {

  constructor(@Inject("UserService") private userService:UserService) { }

  user?:User;
  bookingList?:Booking[]|null;

  ngOnInit(): void {
    this.user=this.userService.getLoggedInUser()?.user;
    console.log("User in Booking list",this.user);

    this
        .userService
        .getAllBookings(this.user?this.user.email:'')
        .subscribe({
          next:bookings=>{
             console.log("Booking List screen",bookings);
             if(this.bookingList!==null){
                this.bookingList = bookings;
             }
             else{
              this.bookingList = undefined;
             }

             console.log("Booking List",this.bookingList);  
          }
        });
  }
}
