import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../services/user-service';
import {
  HolidayType,
  SelectorType,
  Sex,
  UserForm,
} from '../interfaces/user-interfaces';
import { PlaceService } from 'src/app/places/services/places-service';

@Component({
  selector: 'user-create',
  templateUrl: 'user-create.page.html',
})
export class UserCreatePage {
  userCreateForm!: FormGroup;
  placeNames: SelectorType[] = [];
  sexTypes: SelectorType[] = [
    {
      id: Sex.Man,
      label: 'Man',
    },
    {
      id: Sex.Woman,
      label: 'Woman',
    },
    {
      id: Sex.Other,
      label: 'Other',
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
    private _userService: UserService,
    private _placeService: PlaceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.placeNames = this._placeService.getPlaceNames();
    this._setForm();
  }

  private _setForm() {
    this.userCreateForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      sex: new FormControl(),
      residence: new FormControl('', Validators.required),
      favoriteTypeHoliday: new FormControl(Validators.required),
      favoritePlace: new FormControl(''),
    });

    this.userCreateForm.valueChanges.subscribe((form: UserForm) =>
      console.log(form)
    );
  }

  submitForm() {
    console.log(this.userCreateForm.value);
    this._userService.addUser(this.userCreateForm.value);
    this._location.back();
  }
}
