// currency.service.ts

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  selectedCurrency: BehaviorSubject<string> = new BehaviorSubject<string>('PLN');

  setSelectedCurrency(currency: string) {
    this.selectedCurrency.next(currency);
  }

  getSelectedCurrency(): Observable<string> {
    return this.selectedCurrency.asObservable();
  }
}
