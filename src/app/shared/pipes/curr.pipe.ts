import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Money } from '@app/models/money';

interface CurrencyPipeOptions {
  currency?: string;
  digitsInfo?: string;
  displayType?: string;
}

@Pipe({
  name: 'curr'
})
export class CurrPipe implements PipeTransform {

  constructor(
    private currencyPipe: CurrencyPipe,
  ) {}

  transform(value: number|Money, options: CurrencyPipeOptions = {}): any {
    let currency = options.currency || 'EUR';
    const digitsInfo = options.digitsInfo || '1.0-2';
    const displayType = options.displayType || 'symbol';

    if (value instanceof Money) {
      currency = value.currency;
      value = value.amount / 100;
    }

    return this.currencyPipe.transform(value, currency, displayType, digitsInfo);
  }

}
