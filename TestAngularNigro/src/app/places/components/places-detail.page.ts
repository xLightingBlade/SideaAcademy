import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HolidayType, PlaceDto, Seasons } from "../interfaces/places-interfaces";
import { PlaceService } from "../services/places-service";
import { Location } from "@angular/common";

@Component({
    selector:'place-detail',
    templateUrl:'places-detail.page.html',
})
export class PlaceDetailPage{
    placeId:number | undefined;

    selectedPlace: PlaceDto | undefined;
    constructor(
        private _route:ActivatedRoute,
        private _placeService:PlaceService,
        private _location:Location,
        private _router:Router){

        this._route.paramMap.subscribe( paramMap => {
            this.placeId = Number(paramMap.get('id'));
            console.log("Caught route id : " + this.placeId);
            if(this.placeId) {
                this.selectedPlace = this._placeService.getPlaceById(this.placeId);
            }
        })
    }

    navigateBack() {
        this._location.back();
    }

    getHolidayType(holidayType:number):string|undefined {
        switch(holidayType){
            case HolidayType.Adventure:
                return "Adventure";
            case HolidayType.Culture:
                return "Culture";
            case HolidayType.Family:
                return "Family";
            case HolidayType.Relax:
                return "Relax";
            default:
                return "";
        }
    }

    getSeason(season:number):string|undefined {
        return this._placeService.getSeason(season);
    }

}