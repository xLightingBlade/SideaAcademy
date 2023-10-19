import { Injectable } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";

@Injectable({
    providedIn:'root'
})
export class MovieService{
    movieList:MovieInterface[] = [
        {
            id:"1",
            title:"movieOne",
            genres:"Action",
            year:2023,
            runtimeMinutes:120
        },
        {
            id:"2",
            title:"movieTwo",
            genres:"Dramatic",
            year:2013,
            runtimeMinutes:110
        },
        {
            id:"3",
            title:"movieThree",
            genres:"Comedy",
            year:2023,
            runtimeMinutes:120
        }
    ]
    getMovieList():MovieInterface[]{
        return this.movieList;
    }

    getSingleMovie(selectedId:string|null):MovieInterface | undefined {
        return this.movieList.find(movie => movie.id == selectedId);
    }

}