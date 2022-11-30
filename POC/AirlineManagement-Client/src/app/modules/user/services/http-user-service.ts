import { catchError, map, Observable, of, Subject, tap, throwError } from "rxjs";
import { LoggedInDetails, LoginInfo, User } from "../models/user";
import { UserService } from "./user-service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Booking } from "../../booking/models/booking";
import { NGXLogger } from "ngx-logger";

const url='http://localhost:5074/api/users';

@Injectable()
export class HttpUserService implements UserService{

    constructor(private http:HttpClient, private logger: NGXLogger){
        if(!this.loggedInUser){
            var jsonStr=localStorage.getItem("user");
            if(jsonStr){
                var user=JSON.parse(jsonStr);
                this.updateCurrentUser(user);
            }
                
        }
    }

    /**
     * Takes email and password from user for logging in
     * @param loginInfo email and password of user
     * @returns LoggedInDetails of user 
     */
    login(loginInfo: LoginInfo): Observable<LoggedInDetails> {
        this.logger.info("Login method of user http service called")
        console.log('loginInfo', loginInfo);
        return this
                    .http
                    .post<LoggedInDetails>(`${url}/login`,loginInfo)
                    .pipe(
                        tap( (info:LoggedInDetails)=>{
                            console.log('user info received on login:',info);
                            this.updateCurrentUser(info);
                        })
                    );


    }
    
    /**
     * Takes a new user info and register 
     * @param user user
     * @returns User info
     */
    register(user: User):  Observable<User> {
        this.logger.info("register method of user http service called")
        return this.http.post<User>(`${url}/register` , user,{headers:{
            "content-type":"application/json"
        }});
    }

    /**
     * changes current user to undefined for logging out
     * @returns void
     */
    logout(): Observable<void> {
        //this.loggedInUserAnnouncment.next(undefined);
        this.logger.info("Logout of user http service called")
        console.log('logging out current user...');
        this.updateCurrentUser();
        return of(undefined);
    }

    /**
     * Returns the current details of current logged in user
     * @returns LoggedInDetails
     */
    getLoggedInUser(): LoggedInDetails|undefined {
        return this.loggedInUser;
    }

    loggedInUserAnnouncment = new Subject<LoggedInDetails|undefined>();
    loggedInUser?:LoggedInDetails;

    /**
     * updates the current logged in user
     * @param user LoggedInDetails
     */
    updateCurrentUser(user?:LoggedInDetails){
        this.loggedInUser=user;
        this.loggedInUserAnnouncment.next(user);
        if(this.loggedInUser)
            localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        else
            localStorage.removeItem('user');
    }

    /**
     * Retruns false if '404' error is present
     * @param error HttpErrorResponse
     * @returns boolean
     */
    _handleError(error:HttpErrorResponse){
        if(error.status === 404){
            return of(false);  //return false as an observable result
        } else{
            return throwError(()=> error); //else let the error go
        }
    }

    /**
     * Checks whether given user email is already registered
     * @param email user email
     * @returns boolean
     */
    isEmailRegistered(email: string): Observable<boolean> {
        return this
                    .http
                    .get(`${url}/${email}`)
                    .pipe(
                        map(response=>true), //incase of no error
                        catchError(this._handleError) //in case of error
                    );
       
    }

    /**
     * Returns the current logged in user
     * @returns LoggedInDetails of user
     */
    getUserStatusAnnouncement(): Subject<LoggedInDetails | undefined> {
       return this.loggedInUserAnnouncment;
    }

    /**
     * returns all the bookings of logged in user
     * @param email user email
     * @returns bookings of user
     */
    getAllBookings(email: string): Observable<Booking[]> {
        this.logger.info("getAllBookings of user http service called")
        return this
                .http
                .get<Booking[]>(`${url}/${email}/bookings`)
    }
        
}