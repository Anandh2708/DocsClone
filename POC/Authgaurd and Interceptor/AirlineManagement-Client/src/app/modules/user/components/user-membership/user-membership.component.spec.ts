
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BehaviorSubject, from, Observable, of, Subject} from 'rxjs';
import { dummyLoggedInDetails } from 'src/test-data/db-data';
import { LoggedInDetails } from '../../models/user';
import { UserService } from '../../services/user-service';
import { UserMembershipComponent } from './user-membership.component';

describe('UserMembershipComponent', () => {
  let component: UserMembershipComponent;
  let fixture: ComponentFixture<UserMembershipComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService',['getLoggedInUser','getUserStatusAnnouncement'])
    await TestBed.configureTestingModule({
      declarations: [ UserMembershipComponent ],
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

    fixture = TestBed.createComponent(UserMembershipComponent);
    component = fixture.componentInstance;
    var sub : Subject<LoggedInDetails | undefined> = new Subject();
    sub.next(dummyLoggedInDetails);
    userServiceSpy.getUserStatusAnnouncement.and.returnValue(sub);
    fixture.detectChanges();
    
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
});
