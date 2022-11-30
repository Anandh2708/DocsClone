import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './modules/core/components/home-screen/home-screen.component';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  {path:"", component:HomeScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
