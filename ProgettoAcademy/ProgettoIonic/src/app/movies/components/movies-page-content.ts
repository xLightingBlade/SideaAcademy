import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";

@Component({
    selector:'movies-content',
    templateUrl:'movies-page-content.html',
    styleUrls:['movies-page-content.scss']
})
export class MoviesPageContent{
    @Input() movieList:MovieInterface[] = [];

    @Output() clickedMovieId = new EventEmitter<string>;

    constructor(){}
    
    clicked(name:string){
        console.log(name + "clicked");
    }
    
    emitMovieId(id:string){
        this.clickedMovieId.emit(id);
        console.log("value emitted: "+id);
    }
}