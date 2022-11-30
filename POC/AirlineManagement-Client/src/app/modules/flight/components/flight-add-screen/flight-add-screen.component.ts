import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight-service';

@Component({
  selector: 'flight-add-screen',
  templateUrl: './flight-add-screen.component.html',
  styleUrls: ['./flight-add-screen.component.css']
})
export class FlightAddScreenComponent implements OnInit {

  flight?:Flight;

  status='';
  statusStyle='text-primary';

  errors:any;

  form:FormGroup;
 
  
  constructor(private builder :FormBuilder,
              private router:Router,
              @Inject("FlightService") private flightService:FlightService) { 
      this.form=this.builder.group({
        id: ['', [Validators.required]],
        boarding:['', [Validators.required]],
        destination:['', [Validators.required ]],
        departureTime:['', [Validators.required ]],
        arrivalTime:['', [Validators.required ]],

        ticketPrice:['', [Validators.required ]],
        capacity:['', [Validators.required ]],
        company:['', [Validators.required ]],
        description:['', [Validators.required ]]
      })
    }

  ngOnInit(): void {
  }

  handleAddFlight(){
    this.flight={
      ...this.form.value,
      seatsLeft: this.form.value.capacity
    };
    console.log("Flight Added",this.flight);

    this
        .flightService
        .addFlight(this.flight!)
        .subscribe({
          next:response=>{
            console.log("Flight Added in Server",response);
            this.router.navigate(['flight/list']);
          },
          error: (error: HttpErrorResponse)=>{
            console.log('flight add failed',error);
            
             if (error.status==400){
              this.status=`Error: ${error.error.message}`;
              this.statusStyle='text-danger';
              this.errors=error.error.errors;
            }
 
          }
        })

    
  }

}