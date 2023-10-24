import { NgModule } from '@angular/core';
import { SharedHeader } from './shared-header';
import { MoviesPageRoutingModule } from 'src/app/movies/movies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesPageRoutingModule,
  ],
  declarations: [
    SharedHeader,
  ],
  exports: [
    SharedHeader,
  ]
})
export class SharedHeaderModule { }