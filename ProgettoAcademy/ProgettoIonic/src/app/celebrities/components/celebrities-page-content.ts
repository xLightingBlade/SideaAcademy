import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { EmittedObject } from "src/app/movies/interfaces/emitted-object-interface"; //tanto poi si deve cambiare
import { CommonList } from "src/app/shared/interfaces/common-list";

@Component({
    selector:'celebrities-content',
    templateUrl:'celebrities-page-content.html',
    styleUrls:['celebrities-page-content.scss']
})
export class CelebritiesPageContent{
    @Input() celebrityList:CommonList[] = [];

    //valutare di fare tre eventemitter diversi
    @Output() clickedCelebrity = new EventEmitter<EmittedObject>;

    constructor(){}
    
    clicked(name:string){
        console.log(name + "clicked");
    }
    
    emitCelebrityIdForDetail(id:string){
        this.clickedCelebrity.emit({id : id, actionSelected : "detail"});
    }

    emitCelebrityIdForEdit(id:string){
        this.clickedCelebrity.emit({id : id, actionSelected : "edit"});
    }

    emitCelebrityIdForDelete(id:string){
        this.clickedCelebrity.emit({id : id, actionSelected : "delete"});
    }
    emitEventForCreation() {
        this.clickedCelebrity.emit({id:"", actionSelected:"create"});
    }
}