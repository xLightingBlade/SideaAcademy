import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../home/services/film.service';

@Component({
    selector : 'app-profile',
    templateUrl : 'profile.page.html',
    styleUrls : ['profile.page.scss'],
})
export class ProfilePage{
    isAdmin = true;
    itemList = [{name : 'nomeUno'}, {name : 'nomeDue'}, {name : 'nomeTre'}];

    constructor(
        private _router : Router){}

    getValueFromChild(name : string){
        console.log(name);
    }

    goToFilms() {
        console.log("Redirecting to films..")
        this._router.navigate(['films']);
    }
}