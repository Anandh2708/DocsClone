import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './components/popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { CompareDirective } from './directives/validators/compare/compare.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueEmailDirective } from './directives/validators/unique-email/unique-email.directive';
import { InfoLineComponent } from './components/info-line/info-line.component';



@NgModule({
  declarations: [
    PopupComponent,
    UniqueEmailDirective,
    CompareDirective,
    InfoLineComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PopupComponent,
    InfoLineComponent
  ]
})
export class SharedModule { }
