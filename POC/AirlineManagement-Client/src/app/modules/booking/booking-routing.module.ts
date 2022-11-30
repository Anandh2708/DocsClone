import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { BookingListScreenComponent } from './components/booking-list-screen/booking-list-screen.component';

const routes: Routes = [
  {path:"booking/list", component:BookingListScreenComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
