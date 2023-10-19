import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesPage } from './movies.page';
import { MovieDetail } from './components/movie-detail-page';

const routes: Routes = [
  {
    path: '',
    component : MoviesPage
  },
  {
    path:'detail/:id',
    component:MovieDetail,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesPageRoutingModule {}
