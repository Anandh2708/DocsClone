import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/modules/booking/models/booking';
import { BookingService } from '../../../booking/services/booking-service';
import { User } from '../../../user/models/user';
import { UserService } from '../../../user/services/user-service';
import { Flight } from '../../models/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit {

  bookingForm:FormGroup;
  constructor(
    private builder :FormBuilder,
    @Inject("UserService") private userService: UserService,
    @Inject("BookingService") private bookingService:BookingService,
    private router:Router
    ) {

      this.bookingForm=this.builder.group({
        numberOfTickets: ['1', [Validators.required]],   
      });

   }
  
 
  @Input()flight?:Flight;
  bookingPopup:boolean=false;
  invoicePopup:boolean=false;
  continueText:string="Next";
  confirmText:string="Book"
  user?:User;
  validationText:string="";
  validation:boolean=false;

  ngOnInit(): void {
    console.log("card",this.flight);
    this.user = this.userService.getLoggedInUser()?.user
       
  }
  
  booking:any;

  handleBookingForm(confirmation:boolean){

      if(!confirmation){
          this.bookingPopup=false;
          return;
      }

      if(this.bookingForm.value.numberOfTickets <= this.flight?.seatsLeft! && this.bookingForm.value.numberOfTickets >0){
          this.booking = {
            numberOfTickets:this.bookingForm.value.numberOfTickets,
            totalPrice:this.bookingForm.value.numberOfTickets * this.flight!.ticketPrice,
            flightId:this.flight!.id,
            userEmail:this.user!.email
    
          }
          console.log("Booking Info",this.booking);
          this.bookingPopup=false;
          this.invoicePopup=true;
      }
      else{
          this.validationText = "*Enter valid no of seats";
          this.validation=true;
      }
      
  }



  handleBooking(confirmation:boolean){

    if(!confirmation){
      console.log(confirmation);
      return;
    }

    console.log(confirmation);

    console.log("Final Booking Details",this.booking);

    this
        .bookingService
        .addBooking(this.booking!)
        .subscribe({
          next:response=>{
            console.log("Booking Added in Server",response);
            this.router.navigate(['booking/list']);
          }
        })

    

  }



}
