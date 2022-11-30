import { Observable } from "rxjs";
import { Booking, BookingInfo } from "../models/booking";
export interface BookingService{

    getAllBookings():Observable<Booking[]>;
    getbookingByUserId(userId:string):Observable<Booking[]>;
    getbookingById(id:number): Observable<Booking> 
    addBooking(bookinginfo:BookingInfo):Observable<Booking>;
    removeBooking(bookingId:number):Observable<void>;
}