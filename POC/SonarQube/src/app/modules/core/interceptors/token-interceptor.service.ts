import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { UserService } from "../../users/services/user-service";



@Injectable({

    providedIn: 'root'

})



export class TokenInterceptorServie implements HttpInterceptor{

    constructor(@Inject("UserService") private userService:UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var tokenizedRequest = req.clone({

            setHeaders:{

                Authorization : `BEARER ${this.userService.getLoggedInUser()?.token}`

            }

        })

        return next.handle(tokenizedRequest);

    }



}