import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EmittedObject } from "../../shared/interfaces/emitted-object-interface";
import { CommonList } from "src/app/shared/interfaces/common-list";
import { Actions } from "src/app/shared/interfaces/actions-enum";

@Component({
    selector:'movies-content',
    templateUrl:'movies-page-content.html',
    styleUrls:['movies-page-content.scss']
})
export class MoviesPageContent{
    pageTitle = "Movies";
    
    @Input() movieList:CommonList[] = [];

    //valutare di fare tre eventemitter diversi
    @Output() clickedMovie = new EventEmitter<EmittedObject>;

    constructor(){}
    
    clicked(name:string){
        console.log(name + "clicked");
    }
    
    emitMovieIdForDetail(id:string){
        this.clickedMovie.emit({id : id, actionSelected : Actions.Detail});
    }

    emitMovieIdForEdit(id:string){
        this.clickedMovie.emit({id : id, actionSelected : Actions.Edit});
    }

    emitMovieIdForDelete(id:string){
        this.clickedMovie.emit({id : id, actionSelected : Actions.Delete});
    }

    emitEventForCreation() {
        this.clickedMovie.emit({id:"", actionSelected : Actions.Create});
    }
}