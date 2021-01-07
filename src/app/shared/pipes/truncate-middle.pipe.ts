import { Pipe, PipeTransform } from '@angular/core';
import { truncateMiddle } from '../helpers/functions.helper';

@Pipe({
  name: 'truncateMiddle'
})
export class TruncateMiddlePipe implements PipeTransform {

  transform(value: any, frontLen: number, backLen?: number, truncateStr: string = '&hellip;'): any {
    return truncateMiddle(value, frontLen, backLen, truncateStr);
  }
}
