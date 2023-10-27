import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users.page';
import { UserDetailPage } from './components/user-detail.page';
import { UserCreatePage } from './components/user-create.page';
import { UserEditPage } from './components/user-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
  },
  {
    path:'detail/:id',
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
