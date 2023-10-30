import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Actions,
  EmittedObject,
} from 'src/app/shared/interfaces/emitted-object';
import { ItemInterface } from '@itemInterface';
@Component({
  selector: 'places-content',
  templateUrl: 'places-content.page.html',
})
export class PlacesContentPage {
  @Input() placeList: ItemInterface[] = [];

  @Output() clickedPlace = new EventEmitter<EmittedObject>();

  constructor() {}

  clicked(name: string) {
    console.log(name + 'clicked');
  }

  emitPlaceIdForDetail(id: number) {
    this.clickedPlace.emit({ id: id, actionSelected: Actions.Detail });
  }

  emitPlaceIdForEdit(id: number) {
    this.clickedPlace.emit({ id: id, actionSelected: Actions.Edit });
  }

  emitPlaceIdForDelete(id: number) {
    this.clickedPlace.emit({ id: id, actionSelected: Actions.Delete });
  }

  emitEventForCreation() {
    this.clickedPlace.emit({ id: 0, actionSelected: Actions.Create });
  }
}
