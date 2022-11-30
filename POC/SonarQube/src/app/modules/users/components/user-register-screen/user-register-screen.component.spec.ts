import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed,async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpUserService } from '../../services/http-user-service';

import { UserRegisterScreenComponent } from './user-register-screen.component';

describe('UserRegisterScreenComponent', () => {
  let component: UserRegisterScreenComponent;
  let fixture: ComponentFixture<UserRegisterScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterScreenComponent ],
      imports:[
          ReactiveFormsModule,
          HttpClientModule,
          FormsModule,
          BrowserModule
      ],
      providers:[{provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should return false for form invalid',()=>{
  //   expect(component.form.invalid).toBeTrue();
  // })
});
