import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { CelebrityService } from "../services/celebrity-service";
import { Location } from "@angular/common";

@Component({
    selector:'celebrity-detail',
    templateUrl:'celebrity-detail-page.html',
    styleUrls:['celebrity-detail-page.scss']
})
export class CelebrityDetail{

    celebrityId:string | null= "";
    pageTitle:string="";
    selectedCelebrity!: CelebrityInterface;

    constructor(
        private _route:ActivatedRoute,
        private _celebrityService:CelebrityService,
        private _location:Location,
        private _router:Router){

        this._route.paramMap.subscribe( paramMap => {
            this.celebrityId = paramMap.get('id');
            console.log("Caught route id : " + this.celebrityId);
            
            this._celebrityService.getSingleCelebrity(this.celebrityId).subscribe((result:CelebrityInterface) => {
                this.selectedCelebrity = result;
                console.log(result);
                this.pageTitle=this.selectedCelebrity.name;
            })
        })
    }
    
    navigateBack() {
        this._location.back();
    }
}