import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingListScreenComponent } from './components/booking-list-screen/booking-list-screen.component';
import { BookingCardComponent } from './components/booking-card/booking-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookingListScreenComponent,
    BookingCardComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ],
  exports: [
    BookingListScreenComponent,
    BookingCardComponent
  ]
})
export class BookingModule { }
