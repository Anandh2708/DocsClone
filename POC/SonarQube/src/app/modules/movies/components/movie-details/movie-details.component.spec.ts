import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../../app-routing.module';
import { HttpBookingService } from '../../../bookings/services/http-booking-service';
import { HttpUserService } from '../../../users/services/http-user-service';
import { HttpMovieService } from '../../services/http-movie-service';
import { movieMock } from '../../test-data/db-movies';

import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let el:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent ],
      imports:[
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      providers:[{provide:"MovieService",useClass:HttpMovieService},
    {provide:"UserService",useClass:HttpUserService},
  {provide:"BookingService",useClass:HttpBookingService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 it('should set showDeleteDialog to be true', () => {
     component.handleShowDeleteDialog();
    expect(component.showDeleteDialog).toBeTruthy();
  });

  it('should set showBookDialog to be true', () => {
    component.handleShowBookDialog();
    expect(component.showBookDialog).toBeTruthy();
  });

  it('should set showLessSeatsDialog to be false', () => {
    component.showLessSeatsDialog=true;
    component.handleLess(true);
    expect(component.showLessSeatsDialog).toBeFalse();
  });

 it('should set showBookDialog to be true', () => {
      component.handleShowBookDialog();
      expect(component.showBookDialog).toBeTruthy();
    });

  it('should correctly render the passed input movie', () => {
    component.movie = movieMock;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual(movieMock.name);
  });

  it('should calculate and return total amount 500 for ticketprice 100 and ticketsbooked 5', () => {
      expect(component.calculateAmount(5,100)).toBe(500);
   });

  //1 branch
   it('should set showDeleteDialog to be false', () => {
     //1
     component.handleDelete(false);
     expect(component.showDeleteDialog).toBeFalse();
   });
  it('book should open popup', fakeAsync(()=>{
    component.movie = movieMock;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.book');
    //el.query(By.css('.book')).nativeElement.click();
    button.click();
    tick();
    fixture.detectChanges();
    let popUp = el.query(By.css(".book-popup"));
    expect(popUp).toBeTruthy();
    component.handleBook(false);
    fixture.detectChanges();
    expect(component.showBookDialog).toBeFalse();
  }));


  it('handle book true', fakeAsync(()=>{
    component.movie = movieMock;
    fixture.detectChanges();
    component.handleBook(true);
    fixture.detectChanges();
    expect(component.showBookDialog).toBeFalse();
  }));


it("handle book true show payment dialogue",()=>{
  
  component.movie = movieMock;
  fixture.detectChanges();
  component.form.value.tickets =2;
  component.handleBook(true);

  fixture.detectChanges();

  expect(component.showPaymentDialog).toBe(true);
//  expect(component.ticketsBooked!<= component.movie?.availableSeats! && component.ticketsBooked!>0).toBeTrue();
});

   it('should set showBookDialog to be false', () => {
    component.handleBook(false)
    expect(component.showBookDialog).toBeFalse();
  });
 
  // it("should set showPaymentDialog to false",()=>{
  //   component.handlePayment(true);
  //   expect(component.showPaymentDialog).toBeFalse();
  // });

  

});
