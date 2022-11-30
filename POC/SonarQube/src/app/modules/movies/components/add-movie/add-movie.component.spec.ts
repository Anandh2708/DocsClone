import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpUserService } from '../../../users/services/http-user-service';
import { HttpMovieService } from '../../services/http-movie-service';

import { AddMovieComponent } from './add-movie.component';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieComponent ],
      imports:[
        HttpClientModule
      ],
      providers:[{provide:"MovieService",useClass:HttpMovieService},
     {provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
