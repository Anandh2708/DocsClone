import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight-service';

@Component({
  selector: 'flight-list-screen',
  templateUrl: './flight-list-screen.component.html',
  styleUrls: ['./flight-list-screen.component.css']
})
export class FlightListScreenComponent implements OnInit {

  searchForm:FormGroup;
  

  constructor(
    @Inject("FlightService") private flightService:FlightService,
    private builder :FormBuilder,

    ) {
       this.searchForm = this.builder.group({
         boarding:['',[Validators.required]],
         destination:['',[Validators.required]]
       })
     }



  flights?:Flight[];
  

  ngOnInit(): void {

    this
        .flightService
        .getAllFlights()
        .subscribe({
          next:flights=>{
             console.log("Flight List screen",flights);
             this.flights = flights;
             console.log("flights List",this.flights);
          }
        });

  }


  handleSearch(){

      console.log("Search details",this.searchForm.value);
      var boarding = this.searchForm.value.boarding;
      var destination = this.searchForm.value.destination;
      this
      .flightService
      .getAllFlights()
      .pipe(
        map((flights: Flight[]) => 
          flights.filter((flight: Flight) => 
          (flight.boarding.toLowerCase() === boarding.toLowerCase()) && (flight.destination.toLowerCase() === destination.toLowerCase())
        )
      )
      )
      .subscribe({
        next:flights=>{
          console.log("Flights for given Search",flights);
          this.flights = flights;
          
        }
      });

    }
    
  

}
