import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  id?:number;
  booking?: Booking;
  error?:string;
  constructor(
    @Inject("BookingService") private bookingService:BookingService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params=>{
      this.id=params['id'];
            this.bookingService
          .getbookingById(this.id!)
          .subscribe({
            next: booking=>{
              this.booking=booking;
              this.error=undefined;
            },
            error: error=>{
              console.log('in get movie by Id subscription error:',error.status); 
              if(error.status==404)
                this.error=`Invalid id ${this.id}`;
              else if (error.status==0)
                this.error="Couldn't connect to the server";
              this.booking=undefined; //NOT Found
            }
          })
    });
  }

}
