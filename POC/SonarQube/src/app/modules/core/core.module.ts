import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookingsRoutingModule } from '../bookings/bookings-routing.module';
import { UsersModule } from '../users/users.module';
import { AccountComponent } from '../users/components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { MovieCardComponent } from '../movies/components/movie-card/movie-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    UsersModule,
    AccountComponent,
    MovieCardComponent
  ]
})
export class CoreModule { }
