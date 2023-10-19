import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesPage } from './movies.page';
import { MoviesPageContent } from './components/movies-page-content';
import { MovieDetail } from './components/movie-detail-page';

import { MoviesPageRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MoviesPageRoutingModule
  ],
  declarations: [MoviesPage, MoviesPageContent, MovieDetail]
})
export class MoviesPageModule {}
