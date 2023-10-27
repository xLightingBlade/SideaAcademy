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

export interface UserDto{
    id:number,
    name?:string,
    surname:string,
    sex?:number,
    year:number,
    residence:string,
    favoriteTypeHoliday?:number,
    favoritePlace?:number
}

export interface SelectorType {
    id:number,
    label:string
}

export interface UserForm {
    id:number,
    name:string,
    surname:string,
    sex:number,
    year:number,
    residence:string,
    favoriteTypeHoliday:number,
    favoritePlace:string
}