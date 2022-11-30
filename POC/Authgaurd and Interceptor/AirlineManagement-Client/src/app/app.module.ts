import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingModule } from './modules/booking/booking.module';
import { HttpBookingService } from './modules/booking/services/http-booking-service';
import { CoreModule } from './modules/core/core.module';
import { CacheInterceptorService } from './modules/core/interceptors/cache-interceptor.service';
import { TokenInterceptorService } from './modules/core/interceptors/token-interceptor.service';
import { FlightModule } from './modules/flight/flight.module';
import { HttpFlightService } from './modules/flight/services/http-flight-service';
import { HttpUserService } from './modules/user/services/http-user-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BookingModule,
    FlightModule,
    LoggerModule.forRoot(environment.logging)
  ],

  providers: [
    { 
      provide: "UserService", 
      useClass: HttpUserService
    },

    { 
      provide: "FlightService", 
      useClass: HttpFlightService
    },

    { 
      provide: "BookingService", 
      useClass: HttpBookingService
    },
    
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: CacheInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
