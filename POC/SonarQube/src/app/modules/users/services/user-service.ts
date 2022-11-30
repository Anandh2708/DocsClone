import { Observable, Subject } from "rxjs";
import { LoggedInDetails, LoginInfo, User } from "../models/user";


export interface UserService{
    
    login(loginInfo:LoginInfo):Observable<LoggedInDetails>;

    register(user:User):Observable<User>;

    isEmailRegistered(email:string):Observable<boolean>;

    getUserStatusAnnouncement():Subject<LoggedInDetails|undefined>;

    logout():Observable<void>;

    getAuthenticationHeader():any; 

    getLoggedInUser():LoggedInDetails|undefined;

}