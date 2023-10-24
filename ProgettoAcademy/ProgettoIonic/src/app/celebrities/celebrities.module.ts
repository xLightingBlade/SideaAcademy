import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CelebritiesPage } from './celebrities.page';

import { CelebritiesPageRoutingModule } from './celebrities-routing.module';
import { CelebrityDetail } from './components/celebrity-detail-page';
import { CelebrityEditPage } from './components/celebrity-edit-page';
import { CelebritiesPageContent } from './components/celebrities-page-content';
import { CelebrityCreatePage } from './components/celebrity-create-page';
import { SharedHeaderModule } from '../shared/components/shared-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CelebritiesPageRoutingModule,
    SharedHeaderModule,
  ],
  declarations: [CelebritiesPage, CelebritiesPageContent, CelebrityDetail, CelebrityEditPage,
    CelebrityCreatePage,]
})
export class CelebritiesPageModule {}
