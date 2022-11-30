import {  TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from './user-service';

import { loggedInDetails, login, users,  } from '../test-data/db.user';
import { HttpClientModule } from '@angular/common/http';
import { HttpUserService } from './http-user-service';

const url='http://localhost:5167/api/users';

describe('HttpUserService', () => {
    let httpTestingController: HttpTestingController;
    let service:UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [HttpClientModule,HttpClientTestingModule],
          providers: [{provide:"UserService", useClass:HttpUserService}]
        })
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HttpUserService);
      });
      it('should login user', () => {
        service.login(login)
                .subscribe((logInDetails) => {
                expect(logInDetails).toBeTruthy();
                expect(logInDetails.user.email).toBe(loggedInDetails.user.email);
                
            });
        const req = httpTestingController.expectOne(`${url}/login`);
        expect(req.request.method).toEqual("POST");
        req.flush(loggedInDetails);
    });
    it('should register user',()=>{
        service.register(users)
                .subscribe((user)=>{
                expect(user).toBeTruthy();
                expect(user.email).toEqual(users.email);
                });
        const req = httpTestingController.expectOne(`${url}/register`);
        expect(req.request.method).toEqual("POST");
        req.flush(users);
    })

    it('should validate email valid',()=>{
        service.isEmailRegistered(users.email)
                .subscribe((result)=>{
                expect(result).toBeTrue();
                });
        const req = httpTestingController.expectOne(`${url}/validate/${users.email}`);
        expect(req.request.method).toEqual("GET");
        req.flush(users);
    })

    
    afterEach(() => {
        httpTestingController.verify();
    });
    
    
    });