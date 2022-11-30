import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookingsRoutingModule } from './modules/bookings/bookings-routing.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { HttpBookingService } from './modules/bookings/services/http-booking-service';
import { FooterComponent } from './modules/core/components/footer/footer.component';
import { HeaderComponent } from './modules/core/components/header/header.component';
import { HomeComponent } from './modules/core/components/home/home.component';
import { TokenInterceptorServie } from './modules/core/interceptors/token-interceptor.service';
import { MoviesModule } from './modules/movies/movies.module';
import { HttpMovieService } from './modules/movies/services/http-movie-service';
import { SharedModule } from './modules/shared/shared.module';
import { HttpUserService } from './modules/users/services/http-user-service';
import { UsersModule } from './modules/users/users.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MoviesModule,
    BookingsModule,
    UsersModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ 
    { 
    provide: "UserService", 
    useClass: HttpUserService
    },
    {
    provide: "MovieService",
    useClass: HttpMovieService
    },
    {
      provide: "BookingService",
      useClass: HttpBookingService
      },

      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorServie,
        multi: true
  
      }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
