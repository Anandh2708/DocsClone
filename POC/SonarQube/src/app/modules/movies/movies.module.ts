import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { MovieEditorComponent } from './components/movie-editor/movie-editor.component';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movies-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    AddMovieComponent,
    UpdateMovieComponent,
    MovieEditorComponent,
 
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule,
    FormsModule
  ],
  exports:[
    MovieCardComponent,
    UpdateMovieComponent,
  ]

})
export class MoviesModule { }
