import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users.page';
import { UserDetailPage } from './components/user-detail.page';
import { UserCreatePage } from './components/user-create.page';
import { UserEditPage } from './components/user-edit.page';
//import { CanEnterUserGuard } from '../can-enter-user.guard';
import { canAccess, idIsNan } from './guards/_user-functional.guard';
import { userDetailResolver } from '@userResolvers';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
  },
  {
    path:'detail/:id',
    //Questo era con la classe deprecata canActivate:
    //canActivate:[CanEnterUserGuard],
    //questo invece è functional:
    canActivate:[idIsNan ,canAccess],
    resolve: {user: userDetailResolver},   //definito un oggetto Data, fatto di coppie chiave valore
    component:UserDetailPage,
  },
  {
    path:'create',
    component:UserCreatePage,
  },
  {
    path:'edit/:id',
    component:UserEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPageRoutingModule {}
