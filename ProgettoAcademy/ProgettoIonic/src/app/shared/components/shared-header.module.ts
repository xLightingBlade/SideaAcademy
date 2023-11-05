import { NgModule } from '@angular/core';
import { SharedHeader } from './shared-header';
import { MoviesPageRoutingModule } from 'src/app/movies/movies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedIonRangeWrapper } from './range-wrapper';
import { SharedIonProgressBar } from './progress-bar-wrapper';
import { FooterWrapper } from './footer-wrapper';
import { ShowCelebrityNamesPipe } from '../show-celebrity-names.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesPageRoutingModule,
  ],
  declarations: [
    SharedHeader, SharedIonRangeWrapper, SharedIonProgressBar, FooterWrapper, ShowCelebrityNamesPipe
  ],
  exports: [
    SharedHeader, SharedIonRangeWrapper, SharedIonProgressBar, FooterWrapper, ShowCelebrityNamesPipe
  ]
})
export class SharedComponentsModule { }