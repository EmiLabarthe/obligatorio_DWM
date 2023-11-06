import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from './activity';

@Pipe({
  name: 'lastElement'
})
export class LastElementPipe implements PipeTransform {

  transform(array: Activity[]): any {
    return array[array.length - 1];
  }
}
