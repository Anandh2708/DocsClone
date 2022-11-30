import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginScreenComponent } from './components/user-login-screen/user-login-screen.component';
import { UserRegisterScreenComponent } from './components/user-register-screen/user-register-screen.component';
import { UserProfileScreenComponent } from './components/user-profile-screen/user-profile-screen.component';
import { UserMembershipComponent } from './components/user-membership/user-membership.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserLoginScreenComponent,
    UserRegisterScreenComponent,
    UserProfileScreenComponent,
    UserMembershipComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: [
    UserMembershipComponent
  ]
})
export class UserModule { }
