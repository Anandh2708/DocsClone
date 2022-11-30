import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginScreenComponent } from './components/user-login-screen/user-login-screen.component';
import { UserRegisterScreenComponent } from './components/user-register-screen/user-register-screen.component';

const routes: Routes = [{path:"user/login",component:UserLoginScreenComponent},
{path:"user/register",component:UserRegisterScreenComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
