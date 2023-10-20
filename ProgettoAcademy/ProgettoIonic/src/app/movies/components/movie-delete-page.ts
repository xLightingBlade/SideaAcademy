import { Component } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../services/movie-service";

@Component({
    selector:'movie-delete',
    templateUrl:'movie-delete-page.html',
    styleUrls:['movie-delete-page.scss']
})
export class MovieDeletePage{
    
    movieId:string | null= "";

    selectedMovie!: MovieInterface;

    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService){

        this._route.paramMap.subscribe( paramMap => {
            this.movieId = paramMap.get('id');
            console.log("Caught route id : " + this.movieId);
            
            this.selectedMovie = _movieService.getSingleMovie(this.movieId);
        })
    }
}