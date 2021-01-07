import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleName'
})
export class SimpleNamePipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    return this.getFirstAndLastWords(value);
  }
  
  private getFirstAndLastWords(text: string = '') {
    text = text || '';
    
    const textArr = text.split(' ');
    
    if (textArr.length < 3) {
      return text;
    }
    
    return textArr[0] + ' ' + textArr[textArr.length - 1];
  }

}
