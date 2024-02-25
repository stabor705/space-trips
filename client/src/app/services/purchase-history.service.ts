import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCart } from '../models/item-cart';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private readonly history$$ = new BehaviorSubject<ItemCart[]>([]);

  get history$() {
    return this.history$$.asObservable();
  }

  addToHistory(items: ItemCart[]) {
    const currentHistory = this.history$$.value;
    this.history$$.next([...currentHistory, ...items]);
  }

}
