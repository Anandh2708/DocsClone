import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { LoggedInDetails, LoginInfo, User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'user-login-screen',
  templateUrl: './user-login-screen.component.html',
  styleUrls: ['./user-login-screen.component.css']
})
export class UserLoginScreenComponent implements OnInit {

  constructor(
    @Inject("UserService") private userService: UserService,
    private router: Router,
    private logger: NGXLogger
  ) { }

  ngOnInit(): void {
  }

  loginInfo:LoginInfo={
    email: '',
    password:''
  };  

  loggedInUser?:User;

  status?:string;
  statusStyle?:string;

  async handleLogin(){
  
    (<Observable<LoggedInDetails>>(this.userService
      .login(this.loginInfo)))
      .subscribe({
        next: (info:LoggedInDetails)=>{ 
          const user=info.user;
          this.loggedInUser = info.user;
          console.log('user',user);
          this.router.navigate(['/'])
        },
        error: (error:HttpErrorResponse)=>{
          
          if(error.status === 401){
            this.logger.error('User logged in with invalid credentials');
            this.status=`Invalid Login Credentials`;
            this.statusStyle='text-danger';
          }
          
        }
      });

  }

}
