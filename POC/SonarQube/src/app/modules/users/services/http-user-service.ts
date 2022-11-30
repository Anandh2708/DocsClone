import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, Subject, tap, throwError } from "rxjs";
import { LoggedInDetails, LoginInfo, User } from "../models/user";

import { UserService } from "./user-service";

const baseUrl='http://localhost:5167/api/users';

@Injectable(
    {providedIn:"root"}
)
export class HttpUserService implements UserService{

    constructor(private http:HttpClient){
        if(!this.loggedInUser){
            var jsonStr=localStorage.getItem("user");
            if(jsonStr){
                var user=JSON.parse(jsonStr);
                this.updateCurrentUser(user);
            }
                
        }
    }
    getLoggedInUser(): LoggedInDetails|undefined {
        return this.loggedInUser;
    }

    getAuthenticationHeader() {
        if(!this.loggedInUser)
            return {};
        else
            return {
                Authorization:`BEARER ${this.loggedInUser.token}`
            };
    }

    loggedInUserAnnouncment = new Subject<LoggedInDetails|undefined>();
    loggedInUser?:LoggedInDetails;

    updateCurrentUser(user?:LoggedInDetails){
        this.loggedInUser=user;
        this.loggedInUserAnnouncment.next(user);
        if(this.loggedInUser)
            localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        else
            localStorage.removeItem('user');
    }

    login(loginInfo: LoginInfo): Observable<LoggedInDetails> {
        return this
                    .http
                    .post<LoggedInDetails>(`${baseUrl}/login`,loginInfo)
                    .pipe(
                        tap( (info:LoggedInDetails)=>{
                            console.log('user info received on login:',info);
                            this.updateCurrentUser(info);
                        })
                    );
    }
    
    register(user: User):  Observable<User> {
        return this.http.post<User>(`${baseUrl}/register` , user,{headers:{
            "content-type":"application/json"
        }});
    }

    _handleError(error:HttpErrorResponse){
        if(error.status === 404){
            return of(false);  //return false as an observable result
        } else{
            return throwError(()=> error); //else let the error go
        }
    }
    isEmailRegistered(email: string): Observable<boolean> {

        return this
                    .http
                    .get(`${baseUrl}/validate/${email}`)
                    .pipe(
                        map(response=>true), //incase of no error
                        catchError(this._handleError) //in case of error
                    );
       
    }
    getUserStatusAnnouncement(): Subject<LoggedInDetails | undefined> {
       return this.loggedInUserAnnouncment;
    }

    logout(): Observable<void> {
        //this.loggedInUserAnnouncment.next(undefined);
        console.log('logging out current user...');
        this.updateCurrentUser();
        return of(undefined);
    }


    
}