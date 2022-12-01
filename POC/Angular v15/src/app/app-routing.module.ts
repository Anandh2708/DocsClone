import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogsListComponent } from './dogs-list/dogs-list.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo:'list'},
  // {path:'',component:DogsListComponent},
  {path:'list',component: DogsListComponent},
  {path:'details/:index', loadComponent: () => import('./dogs-view/dog-view.component').then(m=>m.DogViewComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
