import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../services/user-service';
import { HolidayType, SelectorType, Sex, UserDto, UserForm } from '../interfaces/user-interfaces';
import { PlaceService } from 'src/app/places/services/places-service';


@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.page.html'
  })
  
  
  export class UserEditPage {
    userEditForm!: FormGroup;
    placeNames:SelectorType[] = [];
    userId!: number;
    selectedUser:UserDto | undefined;

    sexTypes:SelectorType[] = [
        {
            id:Sex.Man,
            label:"Man"
        },
        {
            id:Sex.Woman,
            label:"Woman"
        },
        {
            id:Sex.Other,
            label:"Other"
        }
    ]

    holidayTypes:SelectorType[] = [
        {
            id:HolidayType.Adventure,
            label:"Adventure"
        },
        {
            id:HolidayType.Relax,
            label:"Relax"
        },
        {
            id:HolidayType.Family,
            label:"Family"
        },
        {
            id:HolidayType.Culture,
            label:"Culture"
        },
    ]
    
    constructor(
        private _userService:UserService,
        private _placeService:PlaceService,
        private _router:Router,
        private _activatedRoute:ActivatedRoute,
        private _location:Location) {
            this._activatedRoute.paramMap.subscribe( paramMap => {
                this.userId = Number(paramMap.get('id'));
                console.log("Caught route id : " + this.userId);
                if(this.userId) {
                    this.selectedUser = this._userService.getUserById(this.userId);
                    this.placeNames = this._placeService.getPlaceNames();
                    this._setForm();
                }
            })
    }
        
  
    private _setForm() {
        this.userEditForm = new FormGroup ({
            id:new FormControl(this.selectedUser?.id),
            name: new FormControl(this.selectedUser?.name),
            surname: new FormControl(this.selectedUser?.surname,Validators.required),
            year: new FormControl(this.selectedUser?.year,Validators.required),
            sex: new FormControl(this.selectedUser?.sex),
            residence: new FormControl(this.selectedUser?.residence,Validators.required),
            favoriteTypeHoliday: new FormControl(this.selectedUser?.favoriteTypeHoliday),
            favoritePlace: new FormControl(this.selectedUser?.favoritePlace),
        })
        
        this.userEditForm.valueChanges.subscribe((form: UserForm) => console.log(form));
    }
  

    submitForm() {
        console.log(this.userEditForm.value);
        this._userService.updateUser(this.userEditForm.value);
        this._location.back();

    }
}


  
  
  