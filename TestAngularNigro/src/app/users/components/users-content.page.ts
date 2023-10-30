import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Actions,
  EmittedObject,
} from 'src/app/shared/interfaces/emitted-object';
import { ItemInterface } from '@itemInterface';

@Component({
  selector: 'users-content',
  templateUrl: 'users-content.page.html',
})
export class UsersContentPage {
  @Input() userList: ItemInterface[] = [];

  @Output() clickedUser = new EventEmitter<EmittedObject>();

  constructor() {}

  clicked(name: string) {
    console.log(name + 'clicked');
  }

  emitUserIdForDetail(id: number) {
    this.clickedUser.emit({ id: id, actionSelected: Actions.Detail });
  }

  emitUserIdForEdit(id: number) {
    this.clickedUser.emit({ id: id, actionSelected: Actions.Edit });
  }

  emitUserIdForDelete(id: number) {
    this.clickedUser.emit({ id: id, actionSelected: Actions.Delete });
  }

  emitEventForCreation() {
    this.clickedUser.emit({ id: 0, actionSelected: Actions.Create });
  }
}
