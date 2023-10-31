import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EmittedObject } from "../../shared/interfaces/emitted-object-interface";
import { CommonList } from "src/app/shared/interfaces/common-list";
import { Actions } from "src/app/shared/interfaces/actions-enum";
import { RangeCustomEvent } from "@ionic/angular";
import { RangeValue } from "@ionic/core";

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
    @Output() movieRatingSliderValue = new EventEmitter<RangeValue>
    

    constructor(){}
    
    pinFormatter(value:number) {
        return value/10;
    }

    getFormattedRating(rating:number) {
        return Number(rating! * 10).toFixed(1);
    }

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
    movieRatingSliderChange(e:Event) {
        console.log((e as RangeCustomEvent).detail.value)
        this.movieRatingSliderValue.emit((e as RangeCustomEvent).detail.value);
    }
}