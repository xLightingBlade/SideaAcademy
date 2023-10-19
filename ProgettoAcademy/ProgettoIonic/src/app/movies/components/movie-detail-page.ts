import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieInterface } from "../interfaces/movie-interface";
import { MovieService } from "../services/movie-service";

@Component({
    selector:'movie-detail',
    templateUrl:'movie-detail-page.html',
    styleUrls:['movie-detail-page.scss']
})
export class MovieDetail{
    //capire la gestione dei null
    movieId:string | null= "";

    selectedMovie!: MovieInterface;
    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService){

        this._route.paramMap.subscribe( paramMap => {
            this.movieId = paramMap.get('id');
            console.log("Caught route id : " + this.movieId);
            if(this.movieId){
                this.selectedMovie = _movieService.getSingleMovie(this.movieId)!;
            }
        })
    }


}