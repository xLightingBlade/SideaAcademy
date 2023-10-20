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

    selectedMovie!: MovieInterface;
    movieEditForm!: FormGroup;

    constructor(
        private _route:ActivatedRoute,
        private _movieService:MovieService,
        private _location:Location){

        this._route.paramMap.subscribe( paramMap => {
            this.movieId = paramMap.get('id');
            console.log("Caught route id : " + this.movieId);
            
            this.selectedMovie = _movieService.getSingleMovie(this.movieId);
            this._setForm();
        })
    }

    private _setForm() {
        this.movieEditForm = new FormGroup({
            id: new FormControl(this.selectedMovie.id, Validators.required),
            title: new FormControl(this.selectedMovie.title, Validators.required),
            genres: new FormControl(this.selectedMovie.genres),
            year: new FormControl(this.selectedMovie.year),
            runtimeMinutes: new FormControl(this.selectedMovie.runtimeMinutes),
        })
    }

    submitForm() {
        //Chiaramente per adesso al refresh della pagina si resetta la lista di film, perchè le modifiche non vengono salvate seriamente
        console.log("Updated movie: ",this.movieEditForm.value);
        this._movieService.updateMovie(this.movieEditForm.value);
        this._location.back();
    }
}