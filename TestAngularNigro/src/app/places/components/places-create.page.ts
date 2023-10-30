import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { PlaceService } from '../services/places-service';
import { SelectorType } from 'src/app/users/interfaces/user-interfaces';
import {
  HolidayType,
  PlaceDto,
  PlaceForm,
  Seasons,
} from '../interfaces/places-interfaces';

@Component({
  selector: 'places-create',
  templateUrl: 'places-create.page.html',
})
export class PlacesCreatePage {
  placesCreateForm!: FormGroup;

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
    private _placesService: PlaceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this._setForm();
  }

  private _setForm() {
    this.placesCreateForm = new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      favoriteSeason: new FormControl('', Validators.required),
      typeHoliday: new FormControl('', Validators.required),
      temperatureMin: new FormControl(''),
      temperatureMax: new FormControl(''),
    });

    this.placesCreateForm.valueChanges.subscribe((form: PlaceForm) =>
      console.log(form)
    );
  }

  submitForm() {
    console.log(this.placesCreateForm.value);
    const formValues: PlaceDto = this.placesCreateForm.value;
    const newDto: PlaceDto = {
      ...formValues,
      favoriteSeason: formValues.favoriteSeason
        ? +formValues.favoriteSeason
        : 0,
      typeHoliday: formValues.typeHoliday ? +formValues.typeHoliday : 0,
    };
    this._placesService.addPlace(newDto);
    this._location.back();
  }
}
