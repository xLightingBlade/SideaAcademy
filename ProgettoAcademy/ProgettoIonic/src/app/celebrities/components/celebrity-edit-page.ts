import { Component } from "@angular/core";
import { CelebrityInterface } from "../interfaces/celebrity-interface";
import { ActivatedRoute } from "@angular/router";
import { CelebrityService } from "../services/celebrity-service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
    selector:'celebrity-edit',
    templateUrl:'celebrity-edit-page.html',
    styleUrls:['celebrity-edit-page.scss']
})
export class CelebrityEditPage{
    
    celebrityId:string | null= "";
    pageTitle:string="";
    selectedCelebrity!: CelebrityInterface;
    celebrityEditForm!: FormGroup;

    constructor(
        private _route:ActivatedRoute,
        private _celebrityService:CelebrityService,
        private _location:Location){

        this._route.paramMap.subscribe( paramMap => {
            this.celebrityId = paramMap.get('id');
            console.log("Caught route id : " + this.celebrityId);
            
            this._celebrityService.getSingleCelebrity(this.celebrityId).subscribe((result:CelebrityInterface) =>{
                this.selectedCelebrity = result;
                this._setForm();
                this.pageTitle = "Editing celebrity "+this.selectedCelebrity.name;
            })
        })
    }

    private _setForm() {
        this.celebrityEditForm = new FormGroup({
            id: new FormControl(this.selectedCelebrity.id, Validators.required),
            name: new FormControl(this.selectedCelebrity.name, Validators.required),
            birthYear: new FormControl(this.selectedCelebrity.birthYear),
            deathYear: new FormControl(this.selectedCelebrity.deathYear),
        })
    }

    submitForm() {
        this._celebrityService.updatecelebrity(this.celebrityEditForm.value).subscribe((result:CelebrityInterface) => {
            console.log("updated celeb: ", this.celebrityEditForm.value);
            this.navigateBack();
        })
    }

    navigateBack() {
        this._location.back();
    }
}