import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { Observable } from "rxjs";
import { UserService } from "../../user/services/user-service";
import { Booking } from "../models/booking";
import { BookingService } from "./booking-service";

const url = "http://localhost:5074/api/bookings";

@Injectable()
export class HttpBookingService implements BookingService{

    constructor(
        private http: HttpClient,
        private logger: NGXLogger
    ){  }


    /**
     * returns the list of all bookings made
     * @returns List of all bookings
     */
    getAllBookings(): Observable<Booking[]> {
        this.logger.info("getAllbookings of http booking service called");
        return this
                .http
                .get<Booking[]>(url)
    }

    /**
     * takes a booking id and returns the booking info
     * @param id booking id
     * @returns booking info
     */
    getBookingById(id: number): Observable<Booking> {
        this.logger.info("getBookingById of http booking service called");
        return this
                .http
                .get<Booking>(`${url}/${id}`);
    }

    /**
     * takes a new booking info and adds it to the server
     * @param booking booking
     * @returns booking added
     */
    addBooking(booking: Booking): Observable<Booking> {
        this.logger.info("addBooking of http booking service called");
        return this
                .http
                .post<Booking>(url,booking);
    }

    /**
     * takes a booking id and deletes it from the server
     * @param id booking id
     * @returns 
     */
    deleteBooking(id: number): Observable<void> {
        this.logger.info("deleteBooking of http booking service called");
        return this
                .http
                .delete<void>(`${url}/${id}`);
    }

    /**
     * takes a booking info and updates it in the server
     * @param booking booking info
     * @returns booking updated
     */
    updateBooking(booking: Booking): Observable<Booking> {
        this.logger.info("updateBooking of http booking service called");
        return this
                .http
                .put<Booking>(`${url}/${booking.bookingId}`, booking);
    }

}