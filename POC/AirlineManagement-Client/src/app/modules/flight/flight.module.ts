import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightAddScreenComponent } from './components/flight-add-screen/flight-add-screen.component';
import { FlightListScreenComponent } from './components/flight-list-screen/flight-list-screen.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FlightAddScreenComponent,
    FlightListScreenComponent,
    FlightCardComponent
  ],
  imports: [
    CommonModule,
    FlightRoutingModule,
    SharedModule
  ],
  exports: [
    FlightAddScreenComponent,
    FlightListScreenComponent,
    FlightCardComponent
  ]
})
export class FlightModule { }
