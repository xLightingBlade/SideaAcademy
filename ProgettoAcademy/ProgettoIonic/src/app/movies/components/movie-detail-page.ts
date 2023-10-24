import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

    selectedMovie!: MovieInterface;

    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService,
        private _location:Location){

        this._route.paramMap.subscribe( paramMap => {
            this.movieId = paramMap.get('id');
            console.log("Caught route id : " + this.movieId);
            
            this._movieService.getSingleMovie(this.movieId).subscribe((result:MovieInterface) => {
                this.selectedMovie = result;
                console.log(result);
                this.pageTitle =  this.selectedMovie.title;
            });
            
        })
    }

    navigateBack() {
        this._location.back();
    }
}