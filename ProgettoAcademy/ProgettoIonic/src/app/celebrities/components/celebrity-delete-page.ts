import { Component } from "@angular/core";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { ActivatedRoute } from "@angular/router";
import { CelebrityService } from "../services/celebrity-service";

@Component({
    selector:'celebrity-delete',
    templateUrl:'celebrity-delete-page.html',
    styleUrls:['celebrity-delete-page.scss']
})
export class CelebrityDeletePage{
    
    celebrityId:string | null= "";

    selectedCelebrity!: CelebrityInterface;

    constructor(
        private _route:ActivatedRoute,
        private _celebrityService:CelebrityService){

        this._route.paramMap.subscribe( paramMap => {
            this.celebrityId = paramMap.get('id');
            console.log("Caught route id : " + this.celebrityId);
            
            this.selectedCelebrity = _celebrityService.getSingleCelebrity(this.celebrityId);
        })
    }
}