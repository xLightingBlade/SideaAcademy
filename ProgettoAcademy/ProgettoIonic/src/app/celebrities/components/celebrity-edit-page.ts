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
            
            this.selectedCelebrity = _celebrityService.getSingleCelebrity(this.celebrityId);
            this.pageTitle = "Editing celebrity " + this.selectedCelebrity.primaryName;
            this._setForm();
        })
    }

    private _setForm() {
        this.celebrityEditForm = new FormGroup({
            id: new FormControl(this.selectedCelebrity.id, Validators.required),
            primaryName: new FormControl(this.selectedCelebrity.primaryName, Validators.required),
            birthYear: new FormControl(this.selectedCelebrity.birthYear),
            deathYear: new FormControl(this.selectedCelebrity.deathYear),
        })
    }

    submitForm() {
        //Chiaramente per adesso al refresh della pagina si resetta la lista di film, perchè le modifiche non vengono salvate seriamente
        console.log("Updated celebrity: ",this.celebrityEditForm.value);
        this._celebrityService.updatecelebrity(this.celebrityEditForm.value);
        this.navigateBack();
    }

    navigateBack() {
        this._location.back();
    }
}