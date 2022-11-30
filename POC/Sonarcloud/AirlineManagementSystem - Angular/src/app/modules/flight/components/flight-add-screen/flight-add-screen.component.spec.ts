import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { FlightService } from '../../services/flight-service';
import { FlightAddScreenComponent } from './flight-add-screen.component';

describe('FlightAddScreenComponent', () => {
  let component: FlightAddScreenComponent;
  let fixture: ComponentFixture<FlightAddScreenComponent>;
  let el: DebugElement;
  let flightServiceSpy: jasmine.SpyObj<FlightService>;

  beforeEach(async () => {
    flightServiceSpy = jasmine.createSpyObj('FlightService',['addFlight']);
    
    await TestBed.configureTestingModule({
      declarations: [ FlightAddScreenComponent ],
      providers: [
        { 
          provide: "FlightService", 
          useValue: flightServiceSpy
        },
        
      ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightAddScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail for invalid flight add', ()=>{
    var error : any = new HttpErrorResponse({status: 400, error:{"message": "Duplicate Flight Id"}});
    flightServiceSpy.addFlight.and.returnValue(throwError(()=>error));
    
    component.handleAddFlight();
    fixture.detectChanges();

    expect(flightServiceSpy.addFlight).toHaveBeenCalledTimes(1);
    expect(component.status).toContain(error.error['message']);
  });
  
});
