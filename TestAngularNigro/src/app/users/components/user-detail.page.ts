import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HolidayType, SelectorType, Sex, UserDto } from "../interfaces/user-interfaces";
import { UserService } from "../services/user-service";
import { Location } from "@angular/common";
import { PlaceService } from "src/app/places/services/places-service";

@Component({
    selector:'user-detail',
    templateUrl:'user-detail.page.html',
})
export class UserDetailPage{
    userId:number | undefined;
    selectedUser: UserDto | undefined;
    constructor(
        private _route:ActivatedRoute,
        private _userService:UserService,
        private _placeService:PlaceService,
        private _location:Location,
        private _router:Router){

        this._route.paramMap.subscribe( paramMap => {
            this.userId = Number(paramMap.get('id'));
            console.log("Caught route id : " + this.userId);
            if(this.userId) {
                this.selectedUser = this._userService.getUserById(this.userId);
            }
        })
    }

    getFavoritePlace(placeId:number):string|undefined {
        const place = this._placeService.getPlaceById(placeId);
        return place?.city;
    }

    getStringSex(sex?:number):string|undefined {
        return this._placeService.getStringSex(sex);
    }

    getHolidayType(holidayType:number):string|undefined {
        return this._placeService.getHolidayType(holidayType);
    }

    navigateBack() {
        this._location.back();
    }

}