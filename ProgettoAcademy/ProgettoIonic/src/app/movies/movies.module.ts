import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesPage } from './movies.page';
import { MoviesPageContent } from './components/movies-page-content';
import { MovieDetail } from './components/movie-detail-page';
import { LayoutModule } from '@angular/cdk/layout';
import { MoviesPageRoutingModule } from './movies-routing.module';
import { MovieEditPage } from './components/movie-edit-page';
import { MovieCreatePage } from './components/movie-create-page';
import { SharedComponentsModule } from '../shared/components/shared-header.module';
import { RouterModule } from '@angular/router';
import { toIntPipe } from '../shared/to-int.pipe';
import { OrderBykey } from '../shared/order-by.pipe';
import { ShowCelebrityNamesPipe } from '../shared/show-celebrity-names.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesPageRoutingModule,
    SharedComponentsModule,
    RouterModule,
    LayoutModule,
  ],
  declarations: [
    MoviesPage,
    MoviesPageContent,
    MovieDetail,
    MovieEditPage,
    MovieCreatePage,
    toIntPipe,
    OrderBykey,
    ShowCelebrityNamesPipe,
  ],
})
export class MoviesPageModule {}
