import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebritiesPage } from './celebrities.page';
import { CelebrityDetail } from './components/celebrity-detail-page';
import { CelebrityEditPage } from './components/celebrity-edit-page';
import { CelebrityDeletePage } from './components/celebrity-delete-page';
import { CelebritiesPageContent } from './components/celebrities-page-content';
import { CelebrityCreatePage } from './components/celebrity-create-page';

const routes: Routes = [
  {
    path: '',
    component : CelebritiesPage
  },
  {
    path:'detail/:id',
    component:CelebrityDetail,
  },
  {
    path:'edit/:id',
    component:CelebrityEditPage,
  },
  {
    path:'delete/:id',
    component:CelebrityDeletePage,
  },
  {
    path:'create',
    component:CelebrityCreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelebritiesPageRoutingModule {}
