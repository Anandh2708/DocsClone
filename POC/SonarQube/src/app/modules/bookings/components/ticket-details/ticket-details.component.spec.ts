import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../../../app-routing.module';
import { HttpUserService } from '../../../users/services/http-user-service';
import { HttpBookingService } from '../../services/http-booking-service';
import { bookings } from '../../test-data/db-book';

import { TicketDetailsComponent } from './ticket-details.component';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailsComponent ],
      imports:[
        HttpClientModule,
        AppRoutingModule
      ],
      providers:[{provide:"BookingService",useClass:HttpBookingService},
      {provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed input movie', () => {
    component.booking = bookings[0];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(bookings[0].movie.name);
  });


  
});
