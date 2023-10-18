import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelebritiesPage } from './celebrities.page';

const routes: Routes = [
  {
    path: '',
    component: CelebritiesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelebritiesPageRoutingModule {}
