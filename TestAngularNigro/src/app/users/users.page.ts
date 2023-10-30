import { Component, Output } from '@angular/core';
import { ItemInterface } from '@itemInterface';
import { UserService } from './services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, EmittedObject } from '../shared/interfaces/emitted-object';
import { UserDto } from './interfaces/user-interfaces';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
})
export class UsersPage {
  @Output() userList: ItemInterface[] = [];

  selectedUserId: number | undefined;

  constructor(
    private _userService: UserService,
    private _userRouter: Router,
    private _activateRoute: ActivatedRoute,
    private _toastController: ToastController
  ) {
    this.getUsers();
  }

  getUsers() {
    this._userService.usersObservable$.subscribe((resultList: UserDto[]) => {
      this.userList = resultList.map((element: UserDto) => {
        return {
          id: element.id,
          name: element.name + '' + element.surname,
        };
      });
    });
    this._userService.getUserList();
  }

  public selectActionForUser(emittedObject: EmittedObject) {
    this.selectedUserId = emittedObject.id;
    console.log('caught User id : ' + this.selectedUserId);
    switch (emittedObject.actionSelected) {
      case Actions.Detail: {
        this._goToUserDetail(this.selectedUserId);
        break;
      }
      case Actions.Edit: {
        this._goToUserEdit(this.selectedUserId);
        break;
      }
      case Actions.Delete: {
        this._deleteUser(this.selectedUserId);
        break;
      }
      case Actions.Create: {
        this._goToUserCreate();
      }
    }
  }

  private _goToUserDetail(id: number) {
    console.log('redirecting to User detail');
    this._userRouter.navigate(['detail', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _goToUserEdit(id: number) {
    console.log('redirecting to User editing');
    this._userRouter.navigate(['edit', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _deleteUser(UserId: number) {
    this._userService.deleteUser(UserId);
    this.presentToastAfterDelete();
  }

  private _goToUserCreate() {
    console.log('Redirecting to User creation');
    this._userRouter.navigate(['create'], { relativeTo: this._activateRoute });
  }

  async presentToastAfterDelete() {
    const toast = await this._toastController.create({
      message: 'User successfully deleted',
      duration: 3000,
      position: 'bottom',
      cssClass: 'delete-toast',
    });

    await toast.present();
  }
}
