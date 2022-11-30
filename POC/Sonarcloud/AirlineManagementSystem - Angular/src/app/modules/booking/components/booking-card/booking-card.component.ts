
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../user/models/user';
import { UserService } from '../../../user/services/user-service';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {

  constructor(
    private builder :FormBuilder,
    @Inject("UserService") private userService: UserService,
    @Inject("BookingService") private bookingService:BookingService,
    private router:Router
  ) { 
    this.bookingForm=this.builder.group({
      numberOfTickets: ['1', [Validators.required]],   
    })
  }

  bookingForm:FormGroup;
  @Input() booking?:Booking;
  user?:User;
  deletePopup:boolean=false;
  deleteText:string="Delete";
  deleteClass:string="btn-danger"
  editBookingPopup:boolean=false;
  editInvoicePopup:boolean=false;
  continueText:string="Next";
  confirmText:string="Book";
  bookingEdited?:Booking;
  validationText:string="";
  validation:boolean=false;

  ngOnInit(): void {
     this.user = this.userService.getLoggedInUser()?.user
  }

  handleDeleteBooking(confirmation:boolean){

    if(!confirmation){
      console.log(confirmation);
      this.deletePopup=false;
      return;
    }
    console.log(confirmation);

    this
        .bookingService
        .deleteBooking(this.booking!.bookingId)
        .subscribe({
          next:response=>{
            console.log("Booking deleted from Server",response);
            this.router.navigate(['booking/list']);
          }
        })

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['booking/list']);

  }
 
  handleEditBookingForm(confirmation:boolean){

    if(!confirmation){
        console.log(confirmation);
        this.editBookingPopup=false;
        return;
    }
    if(this.bookingForm.value.numberOfTickets <= this.booking?.flight?.seatsLeft! && this.bookingForm.value.numberOfTickets >0){
        console.log(confirmation);
        var bookingId = this.booking!.bookingId;
        this.bookingEdited = {
          bookingId: bookingId,
          numberOfTickets:this.bookingForm.value.numberOfTickets,
          totalPrice:this.bookingForm.value.numberOfTickets * this.booking!.flight!.ticketPrice,
          flightId:this.booking!.flight!.id,
          userEmail:this.user!.email

        }
        console.log("Booking Info",this.booking);
        this.editBookingPopup=false;
        this.editInvoicePopup=true;
    }
    else{
      this.validationText = "*Enter valid no of seats";
      this.validation=true;
    }
}

handleEditBooking(confirmation:boolean){

  if(!confirmation){
    console.log(confirmation);
    this.editInvoicePopup = false;
    return;
  }

  console.log(confirmation);

  console.log("Final Booking Details",this.booking);

  this
      .bookingService
      .updateBooking(this.bookingEdited!)
      .subscribe({
        next:response=>{
          console.log("Booking Updated in Server",response);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['booking/list']);
        }
      })

}

}
