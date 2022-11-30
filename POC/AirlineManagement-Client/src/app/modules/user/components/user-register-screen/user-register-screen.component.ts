import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, tap } from 'rxjs';

import { compare } from '../../../shared/directives/validators/compare/compare.directive';
import { uniqueEmailValidator } from '../../../shared/directives/validators/unique-email/unique-email.directive';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'user-register-screen',
  templateUrl: './user-register-screen.component.html',
  styleUrls: ['./user-register-screen.component.css']
})
export class UserRegisterScreenComponent implements OnInit {

  user?:User
  
  status='';
  statusStyle='text-primary';
  
  form:FormGroup;
  
  constructor(
    private builder :FormBuilder,
    @Inject("UserService") private userService:UserService,
    private router:Router
  ) { 

    const passwordRules=[
      Validators.required, 
      Validators.minLength(5),
      Validators.maxLength(15)
    ];
  
    this.form=this.builder.group({
      name: ['', [Validators.required]],
      email:['', [
                  Validators.required,
                  Validators.email
                ],
                [
                  uniqueEmailValidator(this.userService)
                ]
            ],
      profilePicture:['', [Validators.required ]],
      gender:['', [Validators.required ]],
      password:['',passwordRules],
      confirmPassword:['',passwordRules]
    },{validator: compare('password','confirmPassword')});

  }

  ngOnInit(): void {
  }
  
  handleRegistration(){

    console.log(this.form);
    if(this.form.invalid){
      console.log('form is invalid');
      return;
    }
    
    this.user={
      ...this.form.value,    
    };

    console.log('registering', this.user);

      (<Observable<User>>(this
        .userService
        .register(this.user!)
        ))
        .pipe(
          tap((response)=>console.log('response',response)),
        )
        .subscribe({
          next:(user)=>{
            console.log('registered', user);
            this.router.navigate(['/user/login'])
          },
          error: (error: HttpErrorResponse)=>{
            console.log('error',error)
          } 
        })
      
   
  }
}
