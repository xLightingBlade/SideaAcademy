import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesPage } from './places.page';
import { PlacesCreatePage } from './components/places-create.page';
import { PlacesEditPage } from './components/places-edit.page';
import { PlaceDetailPage } from './components/places-detail.page';
import { CanEnterPlaceGuard } from '../can-enter-place.guard';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage,
  },
  {
    path: 'detail/:id',
    canActivate: [CanEnterPlaceGuard],
    component: PlaceDetailPage,
  },
  {
    path: 'create',
    component: PlacesCreatePage,
  },
  {
    path: 'edit/:id',
    component: PlacesEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanEnterPlaceGuard],
})
export class PlacesPageRoutingModule {}
