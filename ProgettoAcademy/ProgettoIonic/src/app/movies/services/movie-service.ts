import { Injectable } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";

@Injectable({
    providedIn:'root'
})
export class MovieService{
    //Chiaramente adesso ad ogni refresh della pagina la movieList si resetta a questa:
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

    getSingleMovie(selectedId:string|null):MovieInterface{
        const movie:MovieInterface | undefined = this.movieList.find(movie => movie.id == selectedId);
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
        const movieToUpdateIdx:number = this.movieList.findIndex((item:MovieInterface) => item.id == movie.id)
        if(movieToUpdateIdx != 1) {
            this.movieList[movieToUpdateIdx] = movie;
        }
    }

}