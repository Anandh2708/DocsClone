import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { HttpUserService } from '../../services/http-user-service';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports:[
        HttpClientModule
      ],
      providers:[{provide:"UserService",useClass:HttpUserService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update user status to true',()=>{
    component.updateUserStatus(true);
    expect(component.updateUserStatus).toBeTruthy();
  });
});
