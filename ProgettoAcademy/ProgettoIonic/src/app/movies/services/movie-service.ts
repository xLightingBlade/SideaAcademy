import { Injectable } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class MovieService{

    movieListSubject = new Subject<MovieInterface[]>();
    private _movieList:MovieInterface[] = [
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
        },
        {
            id:"4",
            title:"movieFour",
            genres:"Aiuto",
            year:1990,
            runtimeMinutes:90
        }
    ]
    constructor(){
        this.movieListSubject = new Subject<MovieInterface[]>;
    }
    

    getMovieList(){
        this.movieListSubject.next(this._movieList);
    }

    getSingleMovie(selectedId:string|null):MovieInterface{
        const movie:MovieInterface | undefined = this._movieList.find(movie => movie.id == selectedId);
        if(movie) {
            return movie;
        }else {
            return {
                id:"Not Found",
                title:"Unavailable",
                genres:"Unavailable",
                year:NaN,
                runtimeMinutes:NaN
            }
        }
    }

    updateMovie(movie:MovieInterface){
        console.log(movie.id);
        const movieToUpdateIdx:number = this._movieList.findIndex((item:MovieInterface) => item.id == movie.id)
        if(movieToUpdateIdx != -1) {
            this._movieList[movieToUpdateIdx] = movie;
        }
        this.movieListSubject.next(this._movieList);
    }

}