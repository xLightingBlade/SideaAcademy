import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from 'src/app/places/services/places-service';
import { UserDto } from '../interfaces/user-interfaces';
import { UserService } from '../services/user-service';

@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.page.html',
})
export class UserDetailPage {
  userId: number | undefined;
  selectedUser: UserDto | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _placeService: PlaceService,
    private _location: Location
  ) {
    //Ho spostato il recupero dei dati nel resolver(user-detail.resolver.ts), invocato nel routing module

    this._route.data.subscribe(({ user }) => {
      console.log('Caught route id : ' + user.id);
      this.selectedUser = user;
    });

    //Altro approccio, con lo snapshot della rotta
    //this.selectedUser = this._route.snapshot.data["user"];

    /*this._route.paramMap.subscribe( paramMap => {
            this.userId = Number(paramMap.get('id'));
            if(this.userId) {
                console.log("Caught route id : " + this.userId);
                this.selectedUser = this._userService.getUserById(this.userId);
            }else {
                console.log("Invalid ID");
            }
        })*/
  }

  getFavoritePlace(placeId: number): string | undefined {
    const place = this._placeService.getPlaceById(placeId);
    return place?.city;
  }

  getStringSex(sex?: number): string | undefined {
    return this._placeService.getStringSex(sex);
  }

  getHolidayType(holidayType: number): string | undefined {
    return this._placeService.getHolidayType(holidayType);
  }

  navigateBack() {
    this._location.back();
  }
}
