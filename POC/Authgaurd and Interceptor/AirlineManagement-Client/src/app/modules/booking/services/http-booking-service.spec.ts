import {  HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing";
import { dummyBookings } from "../../../../test-data/db-data";
import { HttpUserService } from "../../user/services/http-user-service";
import { Booking } from "../models/booking";
import { BookingService } from "./booking-service"
import { HttpBookingService } from "./http-booking-service";
import { LoggerTestingModule } from "ngx-logger/testing";

const url = "http://localhost:5074/api/bookings";

describe('BookingService', () => {
    let bookingService : BookingService,
        httpTestingController : HttpTestingController,
        myBooking : Booking;
    
    beforeEach(() =>{
        TestBed.configureTestingModule({
            providers: [
              { 
                provide: "BookingService", 
                useClass: HttpBookingService
              },
            ],
            imports: [
              HttpClientTestingModule,
              LoggerTestingModule
            ],
        });

        //bookingService = TestBed.inject(new InjectionToken<BookingService>('BookingService'));
        bookingService = TestBed.get("BookingService");
        httpTestingController = TestBed.inject(HttpTestingController);
        myBooking = dummyBookings[0];

    });

    it('should retreive all bookings', () => {
        
        bookingService.getAllBookings()
                .subscribe( bookings => {
                    expect(bookings).toBeTruthy();

                    expect(bookings.length).toBe(dummyBookings.length);

                    const booking = bookings.find(booking => booking.bookingId == dummyBookings[0].bookingId);

                    expect(booking?.numberOfTickets).toBe(dummyBookings[0].numberOfTickets);
                });

        const req = httpTestingController.expectOne(url);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.method).toEqual("GET");           
        req.flush(dummyBookings);

    });
 
    it('should find a booking by id', () => {

        bookingService.getBookingById(myBooking.bookingId)
                .subscribe(booking => {

                    expect(booking).toBeTruthy();
                    expect(booking.bookingId).toBe(myBooking.bookingId);
                });
        
        const req = httpTestingController.expectOne(`${url}/${myBooking.bookingId}`);
        expect(req.request.method).toEqual("GET");           
        req.flush(myBooking);

    });

    it('should add a booking', () => {

        bookingService.addBooking(myBooking)
            .subscribe(booking => {
                expect(booking).toBeTruthy();
                expect(booking.bookingId).toBe(myBooking.bookingId);
            });
             
        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toEqual("POST");
        expect(req.request.body.bookingId)
            .toEqual(myBooking.bookingId);
        expect(req.cancelled).toBeFalsy();   
        req.flush(myBooking);

    });

    it('should delete a booking', () => {
         
        bookingService.deleteBooking(myBooking.bookingId)
            .subscribe(result => {
                expect(result).toBeFalsy();
            })
        
        const req = httpTestingController.expectOne(`${url}/${myBooking.bookingId}`);
        expect(req.request.method).toEqual("DELETE");
        expect(req.cancelled).toBeFalsy();   
        req.flush('');
    });

    it('should edit a booking', () => {

        myBooking.numberOfTickets =  5;

        bookingService.updateBooking(myBooking)
                .subscribe(booking => {
                    expect(booking.bookingId).toBe(myBooking.bookingId);
                    expect(booking.numberOfTickets).toBe(myBooking.numberOfTickets);
                });
        
        const req = httpTestingController.expectOne(`${url}/${myBooking.bookingId}`);
        expect(req.request.method).toEqual("PUT");
        expect(req.request.body.numberOfTickets)
            .toEqual(myBooking.numberOfTickets);

        req.flush(myBooking);
    });

    it('should give error if booking fails', () => {

        myBooking.bookingId =  4000;

        bookingService.updateBooking(myBooking)
                .subscribe(booking => {
                    () => fail('Edit booking failed');

                    (error : HttpErrorResponse) => {
                        expect(error.status).toBe(404);
                    }
                });
        
        const req = httpTestingController.expectOne(`${url}/${myBooking.bookingId}`);
        expect(req.request.method).toEqual("PUT");

        req.flush({status:404,
            message:"No Booking with Id '4000'"});
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});