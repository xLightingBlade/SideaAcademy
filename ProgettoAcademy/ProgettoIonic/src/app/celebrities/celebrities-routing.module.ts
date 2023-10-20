import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebritiesPage } from './celebrities.page';
import { CelebrityDetail } from './components/celebrity-detail-page';
import { CelebrityEditPage } from './components/celebrity-edit-page';
import { CelebrityDeletePage } from './components/celebrity-delete-page';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelebritiesPageRoutingModule {}
