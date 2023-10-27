import { Injectable } from "@angular/core";
import { HolidayType, PlaceDto, PlaceForm, Seasons, Sex } from "../interfaces/places-interfaces";
import { Subject } from "rxjs";
import { SelectorType } from "src/app/users/interfaces/user-interfaces";

@Injectable({
    providedIn:'root',
})
export class PlaceService{
  
    private _places: PlaceDto[] =[
        {
            id:1,
            country:"Italy",
            city:"Polignano",
            favoriteSeason:1,
            typeHoliday:1,
            temperatureMin:15,
            temperatureMax:35,
        },
        {
            id:2,
            country:"Hungary",
            city:"Budapest",
            favoriteSeason:3,
            typeHoliday:2,
            temperatureMin:8,
            temperatureMax:23,
        }

    ]

      
  _placesLength = this._places.length;

  _places$ = new Subject<PlaceDto[]>();
  _placesNames$ = new Subject<string>();
  _placesNamesObs$=this._placesNames$.asObservable();
  placesObservable$ = this._places$.asObservable();

  getPlaceList(): void {
    this._places$.next(this._places);
  }

  getPlaceNames():SelectorType[] {
    return this._places.map((place:PlaceDto) =>{
      return {
        id:place.id,
        label:place.city,
      }
    });
  }

  getSeason(season:number):string {
    switch(season){
      case Seasons.Spring:
          return "Spring";
      case Seasons.Autumn:
          return "Autumn";
      case Seasons.Summer:
          return "Summer";
      case Seasons.Winter:
          return "Winter";
      default:
          return "";
    }
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

getStringSex(sex?:number):string|undefined {
  switch(sex){
      case Sex.Man:
          return "Man";
      case Sex.Woman:
          return "Woman";
      case Sex.Other:
          return "Other";
      default:
          return "";
  }
}

  getPlaceById(id:number): PlaceDto | undefined{
    return this._places.find((place:PlaceDto) => place.id === id);
  }

  updatePlace(newPlace:PlaceDto): void {
    const placeToUpdateIdx = this._places.findIndex((place:PlaceDto) => place.id === newPlace.id);
    if (placeToUpdateIdx !== -1) {
      this._places[placeToUpdateIdx] = newPlace;
    }
    this._places$.next(this._places);
  }

  deletePlace(id: number): void {
    const i = this._places.findIndex((place: PlaceDto) => place.id == id);
    if (i !== -1) {
      this._places.splice(i, 1);
    }
    this._places$.next(this._places);
  }

  addPlace(place:PlaceDto) {
    this._placesLength += 1;
    place.id = (this._placesLength)
    this._places.push(place);
    this._places$.next(this._places);
  }

  formToDto(form:PlaceForm):PlaceDto {
    return {
      id:form.id,
      country:form.country,
      city:form.city,
      favoriteSeason:form.favoriteSeason,
      typeHoliday:form.typeHoliday,
      temperatureMax:form.temperatureMax,
      temperatureMin:form.temperatureMin,
    }
  }
  
}