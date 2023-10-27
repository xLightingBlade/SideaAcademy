import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users.page';
import { UserDetailPage } from './components/user-detail.page';
import { UserCreatePage } from './components/user-create.page';
import { UserEditPage } from './components/user-edit.page';
//import { CanEnterUserGuard } from '../can-enter-user.guard';
import { canAccess } from './functionalAccessGuard';

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
    canActivate:[canAccess],
    component:UserDetailPage,
  },
  {
    path:'create',
    component:UserCreatePage,
  },
  {
    path:'edit/:id',
    component:UserEditPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPageRoutingModule {}
