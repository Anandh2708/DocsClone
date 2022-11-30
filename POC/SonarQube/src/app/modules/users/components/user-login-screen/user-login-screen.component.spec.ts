import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpUserService } from '../../services/http-user-service';

import { UserLoginScreenComponent } from './user-login-screen.component';

describe('UserLoginScreenComponent', () => {
  let component: UserLoginScreenComponent;
  let fixture: ComponentFixture<UserLoginScreenComponent>;
  let email:DebugElement;
  let password:DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginScreenComponent ],
      imports:[
          HttpClientModule,
          FormsModule
      ],
      providers:[{provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('Test a property binding value',()=>{
  //   const inputPasswordElement=fixture.debugElement.nativeElement.querySelector('#input')
  // }
});
