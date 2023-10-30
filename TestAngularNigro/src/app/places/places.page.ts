import { Component, Output } from '@angular/core';
import { ItemInterface } from '@itemInterface';
import { PlaceService } from './services/places-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PlaceDto, Seasons } from './interfaces/places-interfaces';
import { Actions, EmittedObject } from '../shared/interfaces/emitted-object';

@Component({
  selector: 'app-places',
  templateUrl: 'places.page.html',
  styleUrls: ['places.page.scss'],
})
export class PlacesPage {
  @Output() placeList: ItemInterface[] = [];

  selectedPlaceId: number | undefined;

  constructor(
    private _placeService: PlaceService,
    private _PlaceRouter: Router,
    private _activateRoute: ActivatedRoute,
    private _toastController: ToastController
  ) {
    this.getPlace();
  }

  getPlace() {
    this._placeService.placesObservable$.subscribe((resultList: PlaceDto[]) => {
      this.placeList = resultList.map((element: PlaceDto) => {
        return {
          id: element.id,
          name:
            element.city +
            ', ' +
            element.country +
            ' (' +
            this._placeService.getSeason(element.favoriteSeason) +
            ')',
        };
      });
    });
    this._placeService.getPlaceList();
  }

  public selectActionForPlace(emittedObject: EmittedObject) {
    this.selectedPlaceId = emittedObject.id;
    console.log('caught Place id : ' + this.selectedPlaceId);
    switch (emittedObject.actionSelected) {
      case Actions.Detail: {
        this._goToPlaceDetail(this.selectedPlaceId);
        break;
      }
      case Actions.Edit: {
        this._goToPlaceEdit(this.selectedPlaceId);
        break;
      }
      case Actions.Delete: {
        this._deletePlace(this.selectedPlaceId);
        break;
      }
      case Actions.Create: {
        this._goToPlaceCreate();
      }
    }
  }

  private _goToPlaceDetail(id: number) {
    console.log('redirecting to Place detail');
    this._PlaceRouter.navigate(['detail', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _goToPlaceEdit(id: number) {
    console.log('redirecting to Place editing');
    this._PlaceRouter.navigate(['edit', id], {
      relativeTo: this._activateRoute,
    });
  }

  private _deletePlace(PlaceId: number) {
    this._placeService.deletePlace(PlaceId);
    this.presentToastAfterDelete();
  }

  private _goToPlaceCreate() {
    console.log('Redirecting to Place creation');
    this._PlaceRouter.navigate(['create'], { relativeTo: this._activateRoute });
  }

  async presentToastAfterDelete() {
    const toast = await this._toastController.create({
      message: 'Place successfully deleted',
      duration: 3000,
      position: 'bottom',
      cssClass: 'delete-toast',
    });

    await toast.present();
  }
}
