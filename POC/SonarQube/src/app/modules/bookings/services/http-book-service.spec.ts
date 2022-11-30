import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpUserService } from "../../users/services/http-user-service";
import { bookingInfo, bookings } from "../test-data/db-book";

import { BookingService } from "./booking-service";
import { HttpBookingService } from "./http-booking-service";

const url='http://localhost:5167/api/booking';
describe('HttpBookService', () => {
    let httpTestingController: HttpTestingController;
    let service:BookingService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [{provide:"BookService", useClass:HttpBookingService},
      {provide:"UserService",useClass:HttpUserService}]
      })
      httpTestingController = TestBed.get(HttpTestingController);
      service = TestBed.get(HttpBookingService);
      
    });
    it('should get all bookings', () => {
        service.getAllBookings()
            .subscribe( (bookings) => {
                expect(bookings).toBeTruthy('No bookings returned');
                console.log("Bookings", bookings);
                expect(bookings.length).toBe(1);
                
            });
        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toEqual("GET");
        req.flush(bookings);
    });
    it('should get a booking by id', () => {
        service.getbookingById(1)
            .subscribe(booking =>{
                expect(booking).toBeTruthy();
                expect(booking.id).toEqual(1);
                console.log("Bookings", bookings);
            });
        const req = httpTestingController.expectOne(`${url}/id/${bookings[0].id}`);
        expect(req.request.method).toEqual("GET");
        req.flush(bookings[0]);
    });
    it('should get a booking by  user id', () => {
        service.getbookingByUserId("user@gmail.com")
            .subscribe(bookings =>{
                expect(bookings).toBeTruthy();
                expect(bookings[0].user.email).toEqual("user@gmail.com");
            })
        
        const req = httpTestingController.expectOne(`${url}/userId/${bookings[0].user.email}`);
       
        expect(req.request.method).toEqual("GET");
        req.flush(bookings);
    });
    it('should remove a book by id', () => {
        service.removeBooking(1)
            .subscribe(result =>{
                expect(result).toBeNull();
                console.log("result", result);
            });       
        const req = httpTestingController.expectOne(`${url}/${bookings[0].id}`);
        expect(req.request.method).toEqual("DELETE");
        req.flush(null);
    
    });

    it('should add a new booking', () => {
        service.addBooking(bookingInfo)
            .subscribe(result => {
                expect(result).toBeTruthy();
            })
             
        const req = httpTestingController.expectOne(`${url}`);
        expect(req.request.method).toEqual("POST");
        req.flush(bookings[0]);
    
    });
   
    afterEach(() => {

        httpTestingController.verify();
    });

    });
    
   