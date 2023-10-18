import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CelebritiesPage } from './celebrities.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CelebritiesPageRoutingModule } from './celebrities-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CelebritiesPageRoutingModule
  ],
  declarations: [CelebritiesPage]
})
export class CelebritiesPageModule {}
