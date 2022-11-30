import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { AuthGuard } from '../core/guards/auth.guard';
const routes: Routes = [
    {path:"movie/list", component:MovieListComponent},
    {path:"movie/add",component:AddMovieComponent,canActivate: [AuthGuard]},
    {path:"movie/details/:id",component:MovieDetailsComponent},
    {path:"movie/edit/:id",component:UpdateMovieComponent,canActivate: [AuthGuard]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class MovieRoutingModule { }