import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseFormat',
})
export class HouseFormatPipe implements PipeTransform {
  transform(house: string): string {
    switch (house) {
      case 'Gryffindor':
        return 'red';
      case 'Slytherin':
        return 'green';
      case 'Ravenclaw':
        return 'blue';
      case 'Hufflepuff':
        return 'yellow';
      default:
        return '#f5f5f5';
    }
  }
}
