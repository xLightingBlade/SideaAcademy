import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MovieService } from "../services/movie-service";
import { Location } from "@angular/common";

@Component({
    selector:'movie-create',
    templateUrl: 'movie-create-page.html',
    styleUrls:['movie-create-page.scss']
})
export class MovieCreatePage{
    movieCreateForm!: FormGroup;
    constructor(
        private _movieService:MovieService,
        private _location:Location){
            this._setForm();
        }

    private _setForm() {
        this.movieCreateForm = new FormGroup({
            title: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
            genres: new FormControl("", Validators.pattern('[a-zA-Z ]*')),
            year: new FormControl("", Validators.pattern('[0-9]*')),
            runtimeMinutes: new FormControl("", Validators.pattern('[0-9]*')),
        })
        this.movieCreateForm.valueChanges.subscribe((form:FormGroup) => console.log(form));
    }

    submitForm() {
        console.log("Created movie: ",this.movieCreateForm.value);
        this._movieService.createMovie(this.movieCreateForm.value);
        this._location.back();
    }
}