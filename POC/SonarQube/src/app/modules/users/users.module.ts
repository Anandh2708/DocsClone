import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserLoginScreenComponent } from './components/user-login-screen/user-login-screen.component';
import { UserRegisterScreenComponent } from './components/user-register-screen/user-register-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './components/account/account.component';


@NgModule({
  declarations: [
    UserLoginScreenComponent,
    UserRegisterScreenComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    UsersRoutingModule,
    AccountComponent
  ]
})
export class UsersModule { }
