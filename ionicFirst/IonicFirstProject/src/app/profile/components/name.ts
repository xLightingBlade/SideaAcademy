import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'app-name',
    templateUrl:'name.html',
})
export class ProfileName{
    @Input() myName = '';
    constructor(){
        //this.myName = "Gabriele";
    }
}