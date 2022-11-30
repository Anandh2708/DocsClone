import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { BookingRoutingModule } from '../booking/booking-routing.module';
import { FlightRoutingModule } from '../flight/flight-routing.module';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FlightRoutingModule,

    UserModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeScreenComponent
  ]
})
export class CoreModule { }
