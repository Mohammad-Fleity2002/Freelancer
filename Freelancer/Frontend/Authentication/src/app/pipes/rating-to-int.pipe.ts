import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingToInt'
})
export class RatingToIntPipe implements PipeTransform {
  transform(value: any): number {
    return parseInt(value, 10);
  }
}
