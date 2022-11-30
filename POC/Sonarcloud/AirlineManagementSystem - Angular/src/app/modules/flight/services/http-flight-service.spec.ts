import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { dummyFlights } from "../../../../test-data/db-data";
import { HttpUserService } from "../../user/services/http-user-service";
import { Flight } from "../models/flight";
import { FlightService } from "./flight-service";
import { HttpFlightService } from "./http-flight-service";
import { LoggerTestingModule } from "ngx-logger/testing";


const url = "http://localhost:5074/api/flights";

describe('FlightService',()=>{
    
    let flightService : FlightService,
        httpTestingController : HttpTestingController,
        mockFlight : Flight;

        beforeEach(() =>{
            TestBed.configureTestingModule({
                providers: [
                  { 
                    provide: "FlightService", 
                    useClass: HttpFlightService
                  },
                ],
                imports: [
                  HttpClientTestingModule,
                  LoggerTestingModule
                ],
            });
    
            flightService = TestBed.get("FlightService");
            httpTestingController = TestBed.inject(HttpTestingController);
            mockFlight= dummyFlights[0];
    
        });

        it('Should return list of flights',()=>{

            flightService.getAllFlights()
                          .subscribe(flights =>{

                              expect(flights).toBeTruthy();
                              expect(flights.length).toBe(dummyFlights.length);
                              const flight = flights.find(flight=> flight.id === dummyFlights[0].id);
                              expect(flight?.company === dummyFlights[0].company);

                          });
            
            const req = httpTestingController.expectOne(url);
            expect(req.cancelled).toBeFalsy();
            expect(req.request.method).toEqual("GET");           
            req.flush(dummyFlights);

        });

        it('should return flight by id',()=>{
            flightService.getFlightById(mockFlight.id)
                          .subscribe(flight=>{
                              expect(flight).toBeTruthy();
                              expect(flight.id).toBe(mockFlight.id);
                          });
            
            var req = httpTestingController.expectOne(`${url}/${mockFlight.id}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockFlight);
        });

        it('should add flight',()=>{
            flightService.addFlight(mockFlight)
                         .subscribe(flight=>{
                             expect(flight).toBeTruthy();
                             expect(flight.id).toBe(mockFlight.id);
                         });
            
            var req = httpTestingController.expectOne(url);
            expect(req.request.method).toBe('POST');
            expect(req.cancelled).toBeFalsy();
            req.flush(mockFlight);
        });

        it('should delete flight',()=>{
            flightService.deleteFlight(mockFlight.id)
                         .subscribe(result=>{
                             expect(result).toBeFalsy();
                         });
            var req = httpTestingController.expectOne(`${url}/${mockFlight.id}`);
            expect(req.request.method).toBe('DELETE');
            expect(req.cancelled).toBeFalsy();
            req.flush('');
        });

        it('should edit a flight', () => {

            mockFlight.company =  "AirIndia";
    
            flightService.updateFlight(mockFlight)
                    .subscribe(flight => {
                        expect(flight.id).toBe(mockFlight.id);
                        expect(flight.company).toBe(flight.company);
                    });
            
            const req = httpTestingController.expectOne(`${url}/${mockFlight.id}`);
            expect(req.request.method).toEqual("PUT");
            expect(req.request.body.company)
                .toEqual(mockFlight.company);
    
            req.flush(mockFlight);
        });

        afterEach(() => {
            httpTestingController.verify();
        });

})