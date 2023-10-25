import { Component } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../services/movie-service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
    selector:'movie-edit',
    templateUrl:'movie-edit-page.html',
    styleUrls:['movie-edit-page.scss']
})
export class MovieEditPage{
    movieId:string | null= "";
    pageTitle:string = "";
    selectedMovie!: MovieInterface;
    movieEditForm!: FormGroup;

    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService,
        private _location:Location){

            this._route.paramMap.subscribe( paramMap => {
                this.movieId = paramMap.get('id');
                console.log("Caught route id : " + this.movieId);
                
                this._movieService.getSingleMovie(this.movieId).subscribe((result:MovieInterface) => {
                    this.selectedMovie = result;
                    this._setForm();
                    this.pageTitle = "Editing movie " + this.selectedMovie.title;
                } );
            })
    }

    private _setForm() {
        this.movieEditForm = new FormGroup({
            id: new FormControl(this.selectedMovie.id, Validators.required),
            title: new FormControl(this.selectedMovie.title, Validators.required),
            genres: new FormControl(this.selectedMovie.genres),
            year: new FormControl(this.selectedMovie.year),
            runningTime: new FormControl(this.selectedMovie.runningTime),
        })
        this.movieEditForm.valueChanges.subscribe((form:FormGroup) => console.log(form));
    }

    submitForm() {
        this._movieService.updateMovie(this.movieEditForm.value).subscribe()
        console.log("Updated movie: ",this.movieEditForm.value);
        this.navigateBack();
    }

    navigateBack() {
        this._location.back();
    }
}