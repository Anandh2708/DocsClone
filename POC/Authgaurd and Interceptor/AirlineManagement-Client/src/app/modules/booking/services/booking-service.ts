import { Observable } from "rxjs";
import { Booking } from "../models/booking";

export interface BookingService{

    getAllBookings(): Observable<Booking[]>;

    getBookingById(id: number): Observable<Booking>;

    addBooking(booking: Booking): Observable<Booking>;

    deleteBooking(id: number): Observable<void>;

    updateBooking(booking: Booking): Observable<Booking>;

}