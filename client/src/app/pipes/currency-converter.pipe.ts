import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
@Pipe({
  name: 'currencyConverter',
  standalone: true
})
export class CurrencyConverterPipe implements PipeTransform {
  constructor(private currencyService: CurrencyService) {}
  private exchangeRates: { [currency: string]: number } = {
    PLN: 1.0,
    USD: 3.9,
    EUR: 4.35,
    GBP: 4.95,
    CHF: 4.6,


  };
  private defaultCurrency = 'PLN';
  convert(amount: number, toCurrency: string): number {
    const fromRate = this.exchangeRates[this.defaultCurrency];
    const toRate = this.exchangeRates[toCurrency];
    return Math.round((amount / toRate) * fromRate);
  }
  transform(
    value: number,
    toCurrency: string
  ): string {
    return `${this.convert(value, toCurrency)} ${toCurrency}`;
  }
}
