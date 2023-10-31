import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'toIntPipe'
})
export class toIntPipe implements PipeTransform{
    transform(value: number, decimalDigits = 1) {
        return (value * 10).toFixed(decimalDigits);
    }
}