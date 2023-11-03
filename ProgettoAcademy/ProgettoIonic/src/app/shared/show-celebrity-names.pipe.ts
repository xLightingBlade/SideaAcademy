import { Pipe, PipeTransform } from "@angular/core";
import { MovieCastInterface } from "../movies/interfaces/movie-interface";

@Pipe({
    name:'showCelebrityNamesPipe'
})
export class ShowCelebrityNamesPipe implements PipeTransform{
    transform(cast: MovieCastInterface[]) {
        return cast.map(element => element.celebrityName).join();
    }

}