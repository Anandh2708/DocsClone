import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes =[
{path:"booking/ticket/:id",component:TicketDetailsComponent,canActivate: [AuthGuard]},
{path:"booking/list",component:BookingListComponent,canActivate: [AuthGuard]},

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
