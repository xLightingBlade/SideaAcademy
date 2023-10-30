import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersPage } from './users.page';

import { UsersPageRoutingModule } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { UsersContentPage } from './components/users-content.page';
import { UserDetailPage } from './components/user-detail.page';
import { UserCreatePage } from './components/user-create.page';
import { UserEditPage } from './components/user-edit.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UsersPageRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UsersPage,
    UsersContentPage,
    UserDetailPage,
    UserCreatePage,
    UserEditPage,
  ],
})
export class UsersPageModule {}
