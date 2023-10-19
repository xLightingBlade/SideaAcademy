import { Component } from "@angular/core";
import { ProfileDetailService } from "../services/profile-detail.service";
import { ProfileDetails } from "../interfaces/profile-detail-interface";

@Component({
    selector:'profile-content',
    templateUrl:'profile-page-content.html',
    styleUrls:['profile-page-content.scss']
})
export class ProfileContentPage{
    //TODO : questo però adesso è sbagliato, la lista dovrei passarla al padre e prenderla qui in input
    constructor(private _detailService:ProfileDetailService){}
    //Per ora sono mockati nel service
    profileDetails:ProfileDetails = this._detailService.getDetails();

}