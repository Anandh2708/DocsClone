import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { Observable } from "rxjs";
import { UserService } from "../../user/services/user-service";
import { Flight } from "../models/flight";
import { FlightService } from "./flight-service";

const url = "http://localhost:5074/api/flights";

@Injectable()
export class HttpFlightService implements FlightService{

    constructor(
        private http: HttpClient,
        private logger: NGXLogger
    ){  }

    /**
     * Returns all the flights available
     * @returns List of all flights
     */
    getAllFlights(): Observable<Flight[]> {
        this.logger.info("getAllFlights of http flight service called");
        return this
                .http
                .get<Flight[]>(url)
    }

    /**
     * takes a flight id and returns its info
     * @param id flight id
     * @returns Flight info
     */
    getFlightById(id: string): Observable<Flight> {
        this.logger.info("getFlightById of http flight service called");
        return this
                .http
                .get<Flight>(`${url}/${id}`);
    }

    /**
     * takes a new flight and adds it to server
     * @param flight flight
     * @returns flight added
     */
    addFlight(flight: Flight): Observable<Flight> {
        this.logger.info("addFlight of http flight service called");
        return this
                .http
                .post<Flight>(url,flight);
    }

    /**
     * takes a flight id and deletes it form the server
     * @param id flight id
     * @returns 
     */
    deleteFlight(id: string): Observable<void> {
        this.logger.info("deleteFlight of http flight service called");
        return this
                .http
                .delete<void>(`${url}/${id}`);
    }

    /**
     * takes a flight info to update it in the server
     * @param flight flight
     * @returns flight updated
     */
    updateFlight(flight: Flight): Observable<Flight> {
        this.logger.info("updateFlight of http flight service called");
        return this
                .http
                .put<Flight>(`${url}/${flight.id}`, flight);
    }

}