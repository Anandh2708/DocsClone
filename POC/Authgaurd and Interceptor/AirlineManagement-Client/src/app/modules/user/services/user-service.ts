import { Observable, Subject } from "rxjs";
import { Booking } from "../../booking/models/booking";
import { LoggedInDetails, LoginInfo, User } from "../models/user";

export interface UserService{
    
    login(loginInfo:LoginInfo):Observable<LoggedInDetails>;

    register(user:User):Observable<User>;

    logout():Observable<void>;

    isEmailRegistered(email:string):Observable<boolean>;

    getUserStatusAnnouncement():Subject<LoggedInDetails|undefined>;

    getLoggedInUser():LoggedInDetails|undefined;

    getAllBookings(email:string): Observable<Booking[]>;

}