import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { DemoComponent } from './demo/demo.component';

import { HttpClientModule } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot(environment.logging),   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


