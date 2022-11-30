
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UserService } from '../../../user/services/user-service';
import { dummyBookings, dummyUser } from '../../../../../test-data/db-data';
import { BookingListScreenComponent } from './booking-list-screen.component';

describe('BookingListScreenComponent', () => {
  let component: BookingListScreenComponent;
  let fixture: ComponentFixture<BookingListScreenComponent>;
  let el: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {

    userServiceSpy = jasmine.createSpyObj('UserService', ['getAllBookings','getLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [ BookingListScreenComponent ],
      providers: [
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

    fixture = TestBed.createComponent(BookingListScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;   
    userServiceSpy.getAllBookings.and.returnValue(of(dummyBookings));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all bookings', () => { 
    const cards = el.queryAll(By.css('booking-card'));
    expect(cards.length).toBe(dummyBookings.length);
    expect(userServiceSpy.getAllBookings).toHaveBeenCalledTimes(1);
  });

});
