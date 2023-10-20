import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CelebritiesPage } from './celebrities.page';

import { CelebritiesPageRoutingModule } from './celebrities-routing.module';
import { CelebrityDetail } from './components/celebrity-detail-page';
import { CelebrityEditPage } from './components/celebrity-edit-page';
import { CelebrityDeletePage } from './components/celebrity-delete-page';
import { CelebritiesPageContent } from './components/celebrities-page-content';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CelebritiesPageRoutingModule
  ],
  declarations: [CelebritiesPage, CelebritiesPageContent, CelebrityDetail, CelebrityEditPage, CelebrityDeletePage]
})
export class CelebritiesPageModule {}
