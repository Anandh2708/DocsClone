import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user-service';

import { UserProfileScreenComponent } from './user-profile-screen.component';

describe('UserProfileScreenComponent', () => {
  let component: UserProfileScreenComponent;
  let fixture: ComponentFixture<UserProfileScreenComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
  
    userServiceSpy = jasmine.createSpyObj('UserService',['getLoggedInUser']);
    await TestBed.configureTestingModule({
      declarations: [ UserProfileScreenComponent ],
      providers: [
        { 
          provide: "UserService", 
          useValue: userServiceSpy
        }
      ],
      imports: [
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
