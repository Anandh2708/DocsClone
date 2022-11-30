import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../users/services/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(@Inject("UserService")private userService:UserService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
      var isAuthenticated = this.userService.getLoggedInUser();
      if (isAuthenticated===undefined) {
        this.router.navigate(['/user/login']);
        // return true;
      }
      return true;
  }
  
}
