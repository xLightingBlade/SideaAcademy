import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { CelebrityService } from "../services/celebrity-service";

@Component({
    selector:'celebrity-detail',
    templateUrl:'celebrity-detail-page.html',
    styleUrls:['celebrity-detail-page.scss']
})
export class CelebrityDetail{

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