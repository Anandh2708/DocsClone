import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { FlightAddScreenComponent } from './components/flight-add-screen/flight-add-screen.component';
import { FlightListScreenComponent } from './components/flight-list-screen/flight-list-screen.component';

const routes: Routes = [
  {path:"flight/list", component:FlightListScreenComponent},
  {path:"flight/add", component:FlightAddScreenComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class FlightRoutingModule { }
