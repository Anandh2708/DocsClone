
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from '../../services/user-service';

import { UserRegisterScreenComponent } from './user-register-screen.component';

describe('UserRegisterScreenComponent', () => {
  let component: UserRegisterScreenComponent;
  let fixture: ComponentFixture<UserRegisterScreenComponent>;
  let el: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterScreenComponent ],
      providers: [
        { 
          provide: "UserService", 
          useValue: userServiceSpy
        }
      ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisterScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable register button for invalid form', ()=>{
    component.handleRegistration();

    const buttonDisabled = el.query(By.css("button:disabled"));
    expect(buttonDisabled).toBeTruthy();
    
  });

});
