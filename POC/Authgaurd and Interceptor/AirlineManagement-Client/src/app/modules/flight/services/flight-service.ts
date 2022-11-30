import { Observable } from "rxjs";
import { Flight } from "../models/flight";

export interface FlightService{

    getAllFlights(): Observable<Flight[]>;

    getFlightById(id: string): Observable<Flight>;

    addFlight(flight: Flight): Observable<Flight>;

    deleteFlight(id: string): Observable<void>;

    updateFlight(flight: Flight): Observable<Flight>;

}