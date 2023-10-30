import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { PlaceService } from '../services/places-service';
import {
  HolidayType,
  PlaceDto,
  PlaceForm,
  Seasons,
} from '../interfaces/places-interfaces';
import { SelectorType } from 'src/app/users/interfaces/user-interfaces';

@Component({
  selector: 'place-edit',
  templateUrl: 'places-edit.page.html',
})
export class PlacesEditPage {
  placeEditForm!: FormGroup;
  placeId!: number;
  selectedPlace: PlaceDto | undefined;

  seasonTypes: SelectorType[] = [
    {
      id: Seasons.Spring,
      label: 'Spring',
    },
    {
      id: Seasons.Summer,
      label: 'Summer',
    },
    {
      id: Seasons.Autumn,
      label: 'Autumn',
    },
    {
      id: Seasons.Winter,
      label: 'Winter',
    },
  ];

  holidayTypes: SelectorType[] = [
    {
      id: HolidayType.Adventure,
      label: 'Adventure',
    },
    {
      id: HolidayType.Relax,
      label: 'Relax',
    },
    {
      id: HolidayType.Family,
      label: 'Family',
    },
    {
      id: HolidayType.Culture,
      label: 'Culture',
    },
  ];

  constructor(
    private _placeService: PlaceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      this.placeId = Number(paramMap.get('id'));
      console.log('Caught route id : ' + this.placeId);
      if (this.placeId) {
        this.selectedPlace = this._placeService.getPlaceById(this.placeId);
        this._setForm();
      }
    });
  }

  private _setForm() {
    this.placeEditForm = new FormGroup({
      id: new FormControl(this.selectedPlace?.id),
      country: new FormControl(
        this.selectedPlace?.country,
        Validators.required
      ),
      city: new FormControl(this.selectedPlace?.city, Validators.required),
      favoriteSeason: new FormControl(
        this.selectedPlace?.favoriteSeason.toString(),
        Validators.required
      ),
      typeHoliday: new FormControl(
        this.selectedPlace?.typeHoliday.toString(),
        Validators.required
      ),
      temperatureMin: new FormControl(this.selectedPlace?.temperatureMin),
      temperatureMax: new FormControl(this.selectedPlace?.temperatureMax),
    });

    this.placeEditForm.valueChanges.subscribe((form: PlaceForm) =>
      console.log(form)
    );
  }

  submitForm() {
    console.log(this.placeEditForm.value);
    const formValues: PlaceDto = this.placeEditForm.value;
    const newDto: PlaceDto = {
      ...formValues,
      favoriteSeason: formValues.favoriteSeason
        ? +formValues.favoriteSeason
        : 0,
      typeHoliday: formValues.typeHoliday ? +formValues.typeHoliday : 0,
    };
    this._placeService.updatePlace(newDto);
    this._location.back();
  }
}
