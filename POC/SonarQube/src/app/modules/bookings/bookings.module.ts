import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsRoutingModule } from './bookings-routing.module';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { SharedModule } from '../shared/shared.module';
import { PopupComponent } from '../shared/components/popup/popup.component';


@NgModule({
  declarations: [
    TicketDetailsComponent,
    BookingListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    BookingsRoutingModule,
  ],
  exports:[
    
  ]
})
export class BookingsModule { }
