import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { UserService } from "src/app/modules/user/services/user-service";
import { UniqueEmailDirective } from "./unique-email.directive";


describe('UniqueEmailDirective', () => {

  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isEmailRegistered']);

    await TestBed.configureTestingModule({
      providers: [
        { 
          provide: "UserService", 
          useValue: userServiceSpy
        }
      ],
      imports: [
        HttpClientTestingModule,

      ],
    })
    .compileComponents();
  });

  it('should create an instance', () => {
    const directive = new UniqueEmailDirective(userServiceSpy);
    expect(directive).toBeTruthy();
  });
});
