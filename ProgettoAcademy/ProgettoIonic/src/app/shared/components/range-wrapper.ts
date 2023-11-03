import { Component, EventEmitter, Output } from "@angular/core";
import { RangeCustomEvent, RangeValue } from "@ionic/core";

@Component({
    selector:'my-range',
    templateUrl:'range-wrapper.html',
})
export class SharedIonRangeWrapper{
    @Output() sliderValueChanged = new EventEmitter<RangeValue>
    sliderColor:string="danger";
    constructor(){}
    
    pinFormatter(value:number) {
        return value/10;
    }
    RatingSliderChangeEmit(e:Event){
        this.setRangeColor(Number((e as RangeCustomEvent).detail.value))
        this.sliderValueChanged.emit((e as RangeCustomEvent).detail.value);
    }

    setRangeColor(value:number) {
        if (value < 40) {
            this.sliderColor = 'danger'
        }else if(value >= 40 && value < 80) {
            this.sliderColor = 'secondary'
        }else {
            this.sliderColor = 'primary'
        }
    }
}