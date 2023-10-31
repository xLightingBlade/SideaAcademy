import { Pipe, PipeTransform } from '@angular/core';
import { CommonList } from './interfaces/common-list';

@Pipe({
  name: 'arrayOrderByPipe',
})
export class OrderBykey implements PipeTransform {
  transform(value: Array<any>, fieldName: string , ascOrDesc:'asc' | 'desc' = 'asc') {
    if(ascOrDesc == 'asc') {
        return value.sort((a,b) => a[fieldName] - b[fieldName]);
    }
    return value.sort((a,b) => b[fieldName] - a[fieldName])
  }
}
