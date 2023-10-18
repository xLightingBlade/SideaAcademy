import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector:'app-name',
    templateUrl:'name.html',
})
export class ProfileName implements OnInit{
    @Input() myName = '';
    @Output() valueToEmit = new EventEmitter<string>();

    emitItem(value: string) {
        this.valueToEmit.emit(value);
      }
      
    constructor(){
        //this.myName = "Gabriele";
    }
    ngOnInit(): void {
        this.emitItem("woooooow");
    }
}