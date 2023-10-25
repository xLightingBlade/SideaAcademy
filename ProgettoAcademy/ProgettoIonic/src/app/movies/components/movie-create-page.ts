import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MovieService } from "../services/movie-service";
import { Location } from "@angular/common";
import { MovieInterface } from "../interfaces/movie-interface";

@Component({
    selector:'movie-create',
    templateUrl: 'movie-create-page.html',
    styleUrls:['movie-create-page.scss']
})
export class MovieCreatePage{
    pageTitle = "Creating new movie";
    movieCreateForm!: FormGroup;
    constructor(
        private _movieService:MovieService,
        private _location:Location){
            this._setForm();
        }

    private _setForm() {
        this.movieCreateForm = new FormGroup({
            id: new FormControl("", Validators.required),
            title: new FormControl("", Validators.required),
            genres: new FormControl(""),
            year: new FormControl(""),
            runningTime: new FormControl(""),
        })
        this.movieCreateForm.valueChanges.subscribe((form:FormGroup) => console.log(form));
    }

    submitForm() {
        this._movieService.createMovie(this.movieCreateForm.value).subscribe((item:MovieInterface) => {
            this.navigateBack();
        });
        console.log("Created movie: ",this.movieCreateForm.value);
    }

    navigateBack() {
        this._location.back();
    }
}