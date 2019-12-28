import { Type } from 'class-transformer';

export class Money {
  @Type(() => Number)
  amount: number;
  currency: string;
  
  public constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
  
  /**
   * Returns a new Money object that represents
   * the sum of this and an other Money object.
   *
   *
   * @return Money
   * @param addends
   */
  public add(...addends: Money[]): Money {
    let amount = this.amount;
    
    addends.forEach(money => {
      this.assertSameCurrency(money);
      amount += money.amount;
    });
    
    return new Money(amount, this.currency);
  }
  
  private assertSameCurrency(money: Money) {
    if (money.currency !== this.currency) {
      throw new Error('Currencies do not match: ' + this.currency + ' with ' + money.currency);
    }
  }
}
