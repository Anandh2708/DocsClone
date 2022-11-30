import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsRoutingModule } from './modules/bookings/bookings-routing.module';
import { HomeRoutingModule } from './modules/core/core-routing.module';
import { MovieRoutingModule } from './modules/movies/movies-routing.module';
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes),BookingsRoutingModule,MovieRoutingModule,HomeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }