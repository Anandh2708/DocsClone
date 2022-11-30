import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';
import { MovieSearchPipe } from './pipes/movie-search.pipes';



@NgModule({
  declarations: [
  
    PopupComponent,
    MovieSearchPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    PopupComponent,
    MovieSearchPipe
  ]
})
export class SharedModule { }
