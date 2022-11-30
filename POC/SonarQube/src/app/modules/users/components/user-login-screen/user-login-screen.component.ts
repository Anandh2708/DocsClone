import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

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
          next:
         
          (info:LoggedInDetails)=>{ 
            const user=info.user;
            console.log('user',user);
            this.status=`Welcome ${user.name}`;
            this.statusStyle='text-success';
            this.router.navigate(['/']);
          },
          
          error: (error:any)=>{
            this.status=`Error: ${error.status}`;
            this.statusStyle='text-danger';
          }
        });

        this.status='please wait...';
        this.statusStyle='text-primary';


  }

  ngOnInit(): void {
  }



}
