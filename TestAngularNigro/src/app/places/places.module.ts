import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlacesPage } from './places.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PlacesPageRoutingModule } from './places-routing.module';
import { PlacesContentPage } from './components/places-content.page';
import { PlacesEditPage } from './components/places-edit.page';
import { PlacesCreatePage } from './components/places-create.page';
import { RouterModule } from '@angular/router';
import { PlaceDetailPage } from './components/places-detail.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlacesPageRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [PlacesPage, PlacesContentPage, PlacesEditPage, PlacesCreatePage, PlaceDetailPage]
})
export class PlacesPageModule {}
