import { Pipe, PipeTransform } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Pipe({
  name: 'perc'
})
export class PercPipe implements PipeTransform {
  
  constructor(
    private percentPipe: PercentPipe,
  ) {}
  
  transform(value: any, digitsInfo?: string): any {
    digitsInfo = digitsInfo || '1.0-2';
  
    return this.percentPipe.transform(value, digitsInfo);
  }

}
