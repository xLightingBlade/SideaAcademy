import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CelebrityService } from "../services/celebrity-service";
import { Location } from "@angular/common";

@Component({
    selector:'celebrity-create',
    templateUrl: 'celebrity-create-page.html',
    styleUrls:['celebrity-create-page.scss']
})
export class CelebrityCreatePage{
    celebrityCreateForm!: FormGroup;
    constructor(
        private _celebrityService:CelebrityService,
        private _location:Location){
            this._setForm();
        }

    private _setForm() {
        this.celebrityCreateForm = new FormGroup({
            primaryName: new FormControl("",Validators.required),
            birthYear: new FormControl(""),
            deathYear: new FormControl(""),
        })
    }

    submitForm() {
        console.log("Created celebrity: ",this.celebrityCreateForm.value);
        this._celebrityService.createCelebrity(this.celebrityCreateForm.value);
        this._location.back();
    }
}