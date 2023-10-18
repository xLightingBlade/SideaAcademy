import { Component } from "@angular/core";
import { filmsInterface } from "./interfaces/filmsInterface";
import { Router } from '@angular/router';
import { FilmService } from "../home/services/film.service";

@Component({
    selector:'app-films',
    templateUrl:'films.page.html',
    styleUrls:['films.page.scss'],
})
export class FilmsPage{
    /*
    films : filmsInterface[] = [
        {
            name : "Star Wars III : La Vendetta dei Sith",
            year : 2005,
            vote : 10
        },
        {
            name : "L'ultimo Samurai",
            year : 2003,
            vote : 9
        },
        {
            name : "Si alza il vento",
            year : 2013,
            vote : 10
        },
        {
            name : "Blade Runner",
            year : 1982,
            vote : 8.5
        }
    ];
    */
    //Più un la, usando il filmservice, che sarà lui a prelevarmi i film da qualche parte, potrò
    //inizializzare la lista di film in un modo tipo films : filmsInterface[] = _filmService.getAll();
    constructor(
        private _router : Router,
        private _filmService : FilmService){}

    films = this._filmService.getList();

    goToProfile() {
        console.log("Redirecting to profile..")
        this._router.navigate(['profile']);
    }
}