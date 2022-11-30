import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { dummyBookings, dummyLoggedInDetails, dummyLoginInfo, dummyUser } from "../../../../test-data/db-data";
import { HttpUserService } from "./http-user-service";
import { UserService } from "./user-service";
import { LoggerTestingModule } from "ngx-logger/testing";

const url = "http://localhost:5074/api/users";

describe('UserService', ()=> {
    let userService : UserService,
        httpTestingController : HttpTestingController;

    beforeEach(() => {


        TestBed.configureTestingModule({
            
            providers: [             
              { 
                provide: "UserService", 
                useClass: HttpUserService
              }
            ],
            imports: [
              HttpClientTestingModule,
              LoggerTestingModule
            ],
        });

        userService = TestBed.get("UserService");
        httpTestingController = TestBed.inject(HttpTestingController);
        
    });

    it('should login a user',()=>{

        userService.login(dummyLoginInfo)
            .subscribe(loggedInDetails => {
                expect(loggedInDetails).toBeTruthy();
                expect(loggedInDetails.user).toBe(dummyLoggedInDetails.user);
            });
        const req = httpTestingController.expectOne(`${url}/login`);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.method).toEqual("POST");           
        req.flush(dummyLoggedInDetails);
    });

    it('should fail for invalid login credentials',() =>{
        userService.login(dummyLoginInfo)
            .subscribe( _ =>{
                () => fail('login failed');

                (error : HttpErrorResponse) => {
                    expect(error.status).toBe(401);
                }
            });
        const req = httpTestingController.expectOne(`${url}/login`);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.method).toEqual("POST"); 
        req.flush({
            "status": 401,
            "message": "Invalid Credentials"
        });
            
    });
    

    it('should register a new user', ()=>{

        userService.register(dummyUser)
            .subscribe(user =>{
                expect(user).toBeTruthy();
                expect(user.email).toEqual(dummyUser.email);
            });
        const req = httpTestingController.expectOne(`${url}/register`);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.method).toEqual("POST");           
        req.flush(dummyUser);

    });

    it('should logout', ()=>{

        userService.logout()
            .subscribe(result => {
                expect(result).toBeFalsy();
            });

    });

    it('should return all bookings of a user', ()=>{
        userService.getAllBookings(dummyUser.email)
            .subscribe(bookings =>{
                expect(bookings).toBeTruthy();
                expect(bookings.length).toBe(dummyBookings.length);
                expect(bookings[0].user?.email).toBe(dummyUser.email);
            });
        const req = httpTestingController.expectOne(`${url}/${dummyUser.email}/bookings`);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.method).toEqual("GET");           
        req.flush(dummyBookings);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    
});