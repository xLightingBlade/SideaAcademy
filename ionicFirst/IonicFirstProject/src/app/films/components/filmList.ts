import { Component, Input } from "@angular/core";
import { filmsInterface } from "../interfaces/filmsInterface";

@Component({
    selector:'app-film-list',
    templateUrl:'filmList.html'
})
export class FilmListComponent{
    @Input() filmList:filmsInterface[] = [];
    constructor(){}
}