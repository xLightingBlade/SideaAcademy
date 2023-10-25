import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesPage } from './movies.page';
import { MoviesPageContent } from './components/movies-page-content';
import { MovieDetail } from './components/movie-detail-page';

import { MoviesPageRoutingModule } from './movies-routing.module';
import { MovieEditPage } from './components/movie-edit-page';
import { MovieCreatePage } from './components/movie-create-page';
import { SharedHeaderModule } from '../shared/components/shared-header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesPageRoutingModule,
    SharedHeaderModule,
    RouterModule,
  ],
  declarations: [MoviesPage, MoviesPageContent, MovieDetail, MovieEditPage,MovieCreatePage]
})
export class MoviesPageModule {}
