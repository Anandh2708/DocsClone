import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpMovieService } from '../../../movies/services/http-movie-service';
import { AccountComponent } from '../../../users/components/account/account.component';
import { HttpUserService } from '../../../users/services/http-user-service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[
        HttpClientModule
      ],
      providers:[{provide:"MovieService",useClass:HttpMovieService},
    {provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain header,footer',()=>{
    expect(HeaderComponent).toBeTruthy();
    expect(FooterComponent).toBeTruthy();
    expect(AccountComponent).toBeTruthy();
    
  })
});
