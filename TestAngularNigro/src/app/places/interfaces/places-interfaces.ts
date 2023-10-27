export enum Sex{
    Man,
    Woman,
    Other
}

export enum HolidayType {
    Adventure,
    Relax,
    Family,
    Culture
}

export enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter,
}

export interface PlaceDto {
    id:number,
    country:string,
    city:string,
    favoriteSeason:number,
    typeHoliday:number,
    temperatureMax?:number,
    temperatureMin?:number
}

export interface PlaceForm {
    id:number,
    country:string,
    city:string,
    favoriteSeason:number,
    typeHoliday:number,
    temperatureMax:number,
    temperatureMin:number,
}