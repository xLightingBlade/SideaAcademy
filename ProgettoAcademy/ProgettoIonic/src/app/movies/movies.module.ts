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
import { MovieDeletePage } from './components/movie-delete-page';
import { MovieCreatePage } from './components/movie-create-page';
import { SharedHeader } from '../shared/components/shared-header';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesPageRoutingModule
  ],
  declarations: [MoviesPage, MoviesPageContent, MovieDetail, MovieEditPage, MovieDeletePage, MovieCreatePage,
    SharedHeader]
})
export class MoviesPageModule {}
