import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesPage } from './movies.page';
import { MovieDetail } from './components/movie-detail-page';
import { MovieEditPage } from './components/movie-edit-page';
import { MovieDeletePage } from './components/movie-delete-page';
import { MovieCreatePage } from './components/movie-create-page'

const routes: Routes = [
  {
    path: '',
    component : MoviesPage,
  },
  {
    path:'detail/:id',
    component:MovieDetail,
  },
  {
    path:'edit/:id',
    component:MovieEditPage,
  },
  {
    path:'delete/:id',
    component:MovieDeletePage,
  },
  {
    path:'create',
    component:MovieCreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesPageRoutingModule {}
