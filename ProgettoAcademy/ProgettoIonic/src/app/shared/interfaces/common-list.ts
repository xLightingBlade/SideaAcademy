import { MovieCastInterface } from "src/app/movies/interfaces/movie-interface";

export interface CommonList{
    id:string,
    name:string,
    rating?:number,
    year?:number,
    celebrityNames?:string,
}
