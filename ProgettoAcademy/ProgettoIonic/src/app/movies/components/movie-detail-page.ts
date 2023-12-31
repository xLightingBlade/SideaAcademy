import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MovieInterface } from "../interfaces/movie-interface";
import { MovieService } from "../services/movie-service";
import { Location } from "@angular/common";

@Component({
    selector:'movie-detail',
    templateUrl:'movie-detail-page.html',
    styleUrls:['movie-detail-page.scss']
})
export class MovieDetail{

    pageTitle:string = "";
    movieId:string | null= "";

    selectedMovie: MovieInterface = {} as MovieInterface;
    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService,
        private _location:Location,
        private _router:Router){

        this._route.paramMap.subscribe( paramMap => {
            this.movieId = paramMap.get('id');
            console.log("Caught route id : " + this.movieId);
            
            this._movieService.getSingleMovie(this.movieId).subscribe((result:MovieInterface) => {
                this.selectedMovie = result;
                this.pageTitle =  this.selectedMovie.title;
            });
            
        })
    }

    navigateBack() {
        this._location.back();
    }

}