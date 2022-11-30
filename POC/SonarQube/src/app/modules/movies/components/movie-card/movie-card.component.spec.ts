import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../../app-routing.module';
import { HttpBookingService } from '../../../bookings/services/http-booking-service';
import { HttpUserService } from '../../../users/services/http-user-service';
import { HttpMovieService } from '../../services/http-movie-service';
import { movieMock, movies } from '../../test-data/db-movies';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ],
      imports:[
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
      providers:[{provide:"MovieService",useClass:HttpMovieService},
    {provide:"UserService",useClass:HttpUserService},
  {provide:"BookingService",useClass:HttpBookingService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.movie;
    expect(component).toBeTruthy();
  });
  it('should correctly render the passed input movie', () => {
    component.movie = movieMock;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toEqual(movieMock.name);
  });
  it('should correctly render the passed input movie certificate and language', () => {
    component.movie= movies[0];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(`${movies[0].certificate} | ${movies[0].language}`);
    console.log(movies[0])
  });
  it('should correctly render the passed input movie name', () => {
    component.movie= movies[0];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toEqual(movies[0].name);
    console.log(movies[0])
  });

  it('should ', () => {
    component.movie = undefined;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5')).toBeFalsy();
  });

});

