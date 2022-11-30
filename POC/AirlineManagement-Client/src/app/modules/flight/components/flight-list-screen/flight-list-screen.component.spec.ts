
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { dummyFlights } from '../../../../../test-data/db-data';
import { FlightService } from '../../services/flight-service';
import { FlightListScreenComponent } from './flight-list-screen.component';

describe('FlightListScreenComponent', () => {
  let component: FlightListScreenComponent;
  let fixture: ComponentFixture<FlightListScreenComponent>;
  let el: DebugElement;
  let flightServiceSpy: jasmine.SpyObj<FlightService>;
  
  beforeEach(async () => {
    flightServiceSpy = jasmine.createSpyObj('FlightService', ['getAllFlights']);

    await TestBed.configureTestingModule({
      declarations: [ FlightListScreenComponent ],
      providers: [
        { 
          provide: "FlightService", 
          useValue: flightServiceSpy
        }
      ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightListScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;   
    flightServiceSpy.getAllFlights.and.returnValue(of(dummyFlights));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all flights', () => { 
    const cards = el.queryAll(By.css('flight-card'));
    expect(cards.length).toBe(dummyFlights.length);
    expect(flightServiceSpy.getAllFlights).toHaveBeenCalledTimes(1);
  });

});
