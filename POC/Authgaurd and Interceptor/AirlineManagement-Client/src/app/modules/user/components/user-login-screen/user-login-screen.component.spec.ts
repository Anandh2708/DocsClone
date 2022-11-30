
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { dummyLoggedInDetails } from '../../../../../test-data/db-data';
import { UserService } from '../../services/user-service';
import { of, throwError } from 'rxjs';
import { UserLoginScreenComponent } from './user-login-screen.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('UserLoginScreenComponent', () => {
  let component: UserLoginScreenComponent;
  let fixture: ComponentFixture<UserLoginScreenComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let el:DebugElement;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService',['login'])
    await TestBed.configureTestingModule({
      declarations: [ UserLoginScreenComponent ],
      providers: [
        { 
          provide: "UserService", 
          useValue:userServiceSpy
        }
      ],
      imports: [
        FormsModule,
        LoggerTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login works',fakeAsync(()=>{

  
   userServiceSpy.login.and.returnValue(of(dummyLoggedInDetails));
   var login = el.query(By.css('.btn')).nativeElement;
   login.click();
   tick()
   fixture.detectChanges();

   expect(userServiceSpy.login).toHaveBeenCalledTimes(1);
   expect(component.loggedInUser).toBe(dummyLoggedInDetails.user);
    
     
  }));


  it('should login Fails',fakeAsync(()=>{
    var error : any = new HttpErrorResponse({status: 401, error:{"message": "Invalid Credentials"}});
    userServiceSpy.login.and.returnValue(throwError(()=>error));
    var login = el.query(By.css('.btn')).nativeElement;
    login.click();
    tick()
    fixture.detectChanges();
    expect(userServiceSpy.login).toHaveBeenCalledTimes(1);
    expect(component.status).toBe('Invalid Login Credentials');      
   }));
  
});
