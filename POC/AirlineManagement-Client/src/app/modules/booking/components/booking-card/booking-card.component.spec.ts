import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyBookings, dummyUser } from '../../../../../test-data/db-data';
import { BookingService } from '../../services/booking-service';
import { BookingListScreenComponent } from '../booking-list-screen/booking-list-screen.component';

import { BookingCardComponent } from './booking-card.component';
import { UserService } from 'src/app/modules/user/services/user-service';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let el: DebugElement;
  let bookingServiceSpy: jasmine.SpyObj<BookingService>;
  let UserServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    bookingServiceSpy = jasmine.createSpyObj('BookingService', ['deleteBooking','updateBooking']);
    UserServiceSpy = jasmine.createSpyObj('userService', ['getLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [ BookingCardComponent ],
      providers: [
        { 
          provide: "UserService", 
          useValue : UserServiceSpy
        },
        { 
          provide: "BookingService", 
          useValue: bookingServiceSpy
        },
        
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'booking/list', component: BookingListScreenComponent }, 

        ]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCardComponent);
    component = fixture.componentInstance;
    component.user = dummyUser;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a booking card', ()=>{
    component.booking = dummyBookings[0];
    fixture.detectChanges();
    const card = el.query(By.css(".card"));
    const flightId = el.query(By.css('.flight-id'));

    expect(card).toBeTruthy();
    expect(flightId.nativeElement.textContent).toContain(dummyBookings[0].flightId);
  });

  it('should open delete popUp', fakeAsync(()=>{
    component.booking = dummyBookings[0];
    fixture.detectChanges();

    let popUp = el.query(By.css(".delete-popup"));   
    expect(popUp).toBeFalsy();

    const button =fixture.debugElement.nativeElement.querySelector('.btn-danger');
    button.click();
    tick();
    fixture.detectChanges();

    popUp = el.query(By.css(".delete-popup"));
    
    expect(popUp).toBeTruthy();
    expect(popUp.nativeElement.textContent).toContain(dummyBookings[0].flightId);
  }));

  it('should close delete Popup', fakeAsync( ()=>{
    component.booking = dummyBookings[0];
    fixture.detectChanges();

    const button =fixture.debugElement.nativeElement.querySelector('.btn-danger');
    button.click();
    tick();
    fixture.detectChanges();

    let popUp = el.query(By.css(".delete-popup"));   
    expect(popUp).toBeTruthy();

    component.handleDeleteBooking(false);
    fixture.detectChanges();

    expect(component.deletePopup).toBeFalse();

    popUp = el.query(By.css(".delete-popup"));  
    expect(popUp).toBeFalsy();
  }));

  it('should open edit booking form popUp', fakeAsync(()=>{
    component.booking = dummyBookings[0];
    fixture.detectChanges();

    let popUp = el.query(By.css(".edit-booking-popup"));   
    expect(popUp).toBeFalsy();

    const button =fixture.debugElement.nativeElement.querySelector('.btn-success');
    button.click();
    tick();
    fixture.detectChanges();

    popUp = el.query(By.css(".edit-booking-popup"));
    
    expect(popUp).toBeTruthy();
    expect(popUp.nativeElement.textContent).toContain(dummyBookings[0].flightId);
  }));

  it('should close edit booking form popUp', fakeAsync(()=>{
    component.booking = dummyBookings[0];
    fixture.detectChanges();

    const button =fixture.debugElement.nativeElement.querySelector('.btn-success');
    button.click();
    tick();
    fixture.detectChanges();

    let popUp = el.query(By.css(".edit-booking-popup"));
    
    expect(popUp).toBeTruthy();

    component.handleEditBookingForm(false);
    fixture.detectChanges();

    expect(component.editBookingPopup).toBeFalse();

    popUp = el.query(By.css(".edit-booking-popup"));

    expect(popUp).toBeFalsy();
  }));

  it('should open edit booking invoice popUp for valid booking', fakeAsync(()=>{
    component.booking = dummyBookings[0];
    component.bookingEdited = dummyBookings[0];
    component.user = dummyUser;
    fixture.detectChanges();

    let popUp = el.query(By.css(".edit-invoice-popup"));   
    expect(popUp).toBeFalsy();

    component.handleEditBookingForm(true);
    fixture.detectChanges();

    popUp = el.query(By.css(".edit-invoice-popup"));
    
    expect(popUp).toBeTruthy();
    expect(popUp.nativeElement.textContent).toContain(dummyBookings[0].flightId);
  }));

  it('should close edit pop-up for close action', fakeAsync(()=>{

    component.booking = dummyBookings[0];
    component.bookingEdited = dummyBookings[0];
    component.bookingEdited.numberOfTickets = 1000;
    component.user = dummyUser;
    component.editInvoicePopup = true;
    fixture.detectChanges();

    var popup = el.query(By.css('.edit-invoice-popup'));

    expect(popup).toBeTruthy();
    component.handleEditBooking(false);
    fixture.detectChanges();

    expect(component.editInvoicePopup).toBeFalsy();

    popup = el.query(By.css(".edit-invoice-popup"));   
    expect(popup).toBeFalsy();

  }));

});
