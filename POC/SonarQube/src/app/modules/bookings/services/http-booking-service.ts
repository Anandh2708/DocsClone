import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Booking, BookingInfo } from "../models/booking";
import { UserService } from "../../users/services/user-service";
import { BookingService } from "./booking-service";


const url='http://localhost:5167/api/booking';

@Injectable({
    providedIn:"root"    
})
export class HttpBookingService implements BookingService {

    constructor(
        private http: HttpClient,
        @Inject("UserService") private userService: UserService
    ){  }

    getAllBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(url);
    }
    addBooking(bookingInfo: BookingInfo): Observable<Booking> {
        console.log("add booking called");
        return this.http.post<Booking>(`${url}`,bookingInfo);
    }
    
    removeBooking(bookingId: number): Observable<void> {
        return this.http.delete<void>(`${url}/${bookingId}`);
    }
    getbookingByUserId(userId: string): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${url}/userId/${userId}`);
    }

    getbookingById(id:number): Observable<Booking> {
        return this.http.get<Booking>(`${url}/id/${id}`);
    }

 

    

    
    get options(){
        return {
            headers: this.userService.getAuthenticationHeader()
        }
    }

    
    _handleError(error:HttpErrorResponse){
        
        console.log('error adding movie', error);
        return throwError(()=> error); //else let the error go        
    
    }
    
    
}