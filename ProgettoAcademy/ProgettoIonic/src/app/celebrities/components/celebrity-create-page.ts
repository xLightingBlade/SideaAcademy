import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CelebrityService } from "../services/celebrity-service";
import { Location } from "@angular/common";
import { CelebrityInterface } from "../interfaces/celebrity-interface";

@Component({
    selector:'celebrity-create',
    templateUrl: 'celebrity-create-page.html',
    styleUrls:['celebrity-create-page.scss']
})
export class CelebrityCreatePage{
    pageTitle = "Creating new celebrity";
    celebrityCreateForm!: FormGroup;
    constructor(
        private _celebrityService:CelebrityService,
        private _location:Location){
            this._setForm();
        }

    private _setForm() {
        this.celebrityCreateForm = new FormGroup({
            id:new FormControl("", Validators.required),
            name: new FormControl("",Validators.required),
            birthYear: new FormControl(""),
            deathYear: new FormControl(""),
        })
    }

    submitForm() {
        this._celebrityService.createCelebrity(this.celebrityCreateForm.value).subscribe((item:CelebrityInterface) => {
            this.navigateBack();
            console.log("Created celebrity: ",this.celebrityCreateForm.value);
        })
    }

    navigateBack() {
        this._location.back();
    }
}