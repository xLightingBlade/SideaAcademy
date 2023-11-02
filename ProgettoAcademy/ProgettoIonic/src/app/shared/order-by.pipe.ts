import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayOrderByPipe',
})
export class OrderBykey implements PipeTransform {
  transform(
    value: Array<any>,
    fieldName: 'rating' | 'name',
    ascOrDesc: 'asc' | 'desc' = 'asc'
  ) {
    switch (fieldName) {
      case 'rating': {
        if (ascOrDesc == 'asc') {
          return value.sort((a, b) => a.rating - b.rating);
        }
        return value.sort((a, b) => b.rating - a.rating);
      }
      case 'name': {
        if (ascOrDesc == 'asc') {
          return value.sort(function(a,b) {return a.name > b.name? 1:-1});
        } else {
          return value.sort(function(a,b) {return b.name > a.name? 1:-1});
        }
      }
      default: {
        return value;
      }
    }
  }
}
