import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpUserService } from '../../users/services/http-user-service';
import { UserService } from '../../users/services/user-service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let userService: UserService;
  let guard: AuthGuard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[{
        provide:"UserService",useClass:HttpUserService
      }]
    });
    guard = TestBed.get(AuthGuard);
    userService = TestBed.get(HttpUserService);
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


});