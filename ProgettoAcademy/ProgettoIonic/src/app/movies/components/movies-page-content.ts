import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MovieInterface } from "../interfaces/movie-interface";
import { EmittedObject } from "../interfaces/emitted-object-interface";

@Component({
    selector:'movies-content',
    templateUrl:'movies-page-content.html',
    styleUrls:['movies-page-content.scss']
})
export class MoviesPageContent{
    @Input() movieList:MovieInterface[] = [];

    //valutare di fare tre eventemitter diversi
    @Output() clickedMovie = new EventEmitter<EmittedObject>;

    constructor(){}
    
    clicked(name:string){
        console.log(name + "clicked");
    }
    
    emitMovieIdForDetail(id:string){
        this.clickedMovie.emit({movieId : id, actionSelected : "detail"});
    }

    emitMovieIdForEdit(id:string){
        this.clickedMovie.emit({movieId : id, actionSelected : "edit"});
    }

    emitMovieIdForDelete(id:string){
        this.clickedMovie.emit({movieId : id, actionSelected : "delete"});
    }
}