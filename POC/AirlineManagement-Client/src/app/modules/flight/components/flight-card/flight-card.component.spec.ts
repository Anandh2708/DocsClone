import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dummyBookings, dummyFlights, dummyUser } from '../../../../../test-data/db-data';
import { FlightCardComponent } from './flight-card.component';
import { UserService } from '../../../user/services/user-service';
import { BookingService } from '../../../booking/services/booking-service';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;
  let el: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService',['getLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [ FlightCardComponent ],
      providers: [
        { 
          provide: "BookingService", 
          useValue: bookingServiceSpy
        },
        { 
          provide: "UserService", 
          useValue: userServiceSpy
        },
      ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    component.user=dummyUser;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a flight card', ()=>{
    component.flight = dummyFlights[0];
    fixture.detectChanges();

    const card = el.query(By.css(".card"));
    const flightId = el.query(By.css('.flight-id'));

    expect(card).toBeTruthy();
    expect(flightId.nativeElement.textContent).toContain(dummyFlights[0].id);
  });

  it('should should open booking-popup', fakeAsync(()=>{
    component.flight = dummyFlights[0];
    component.user=dummyUser;
    fixture.detectChanges();

    let popUp = el.query(By.css(".booking-popup"));   
    expect(popUp).toBeFalsy();

    const button = el.query(By.css(".book-button"));
    expect(button).toBeTruthy();

    button.nativeElement.click();
    tick();
    fixture.detectChanges();

    popUp = el.query(By.css(".booking-popup"));
    
    expect(popUp).toBeTruthy();
    expect(popUp.nativeElement.textContent).toContain(dummyBookings[0].flightId);

  }));

  it('should close handle booking form', fakeAsync(()=>{
    component.flight = dummyFlights[0];
    component.user =dummyUser;
    fixture.detectChanges();

    const button = el.query(By.css(".btn"));
    button.nativeElement.click();
    tick();
    fixture.detectChanges();

    let popUp = el.query(By.css(".booking-popup"));
    
    expect(popUp).toBeTruthy();

    component.handleBookingForm(false);
    fixture.detectChanges();

    expect(component.bookingPopup).toBeFalse();

    popUp = el.query(By.css(".booking-popup"));

    expect(popUp).toBeFalsy();
  }));

  it('should open invoicePopup for valid booking', () =>{
    let popUp = el.query(By.css(".invoice-popup"));    
    expect(popUp).toBeFalsy();

    component.flight = dummyFlights[0];
    component.user = dummyUser;
    component.booking = dummyBookings[0];
    component.invoicePopup = true;
    component.handleBookingForm(true);
    fixture.detectChanges();

    popUp = el.query(By.css(".invoice-popup"));
    
    expect(popUp).toBeTruthy();
    expect(popUp.nativeElement.textContent).toContain(dummyBookings[0].flightId);
  });

});
