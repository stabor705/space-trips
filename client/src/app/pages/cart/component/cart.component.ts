import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CurrencyService} from "../../../services/currency.service";
import {CartApiService} from "../../../services/cart-api.service";
import {Cart, CartItem} from "../../../models/cart";
import {Trip, TripId} from "../../../models/trip.model";
import {pipe} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'agh-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public cart: Cart = {items: [], total: 0, userId: null};
  selectedCurrency: string;

  constructor(
    private readonly cartService: CartApiService,
    private readonly currencyService: CurrencyService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly message: NzMessageService,
  ) {
  }

  public updateCartItem(item: CartItem, quantity: number): void {
    this.cartService.updateCartItem({...item, quantity})
      .subscribe({
        next: (cart) => this.message.success('Koszyk zaktualizowany'),
        error: (response) => this.message.error(response?.error?.message?.message)
      })
  }

  public deleteFromCart(item: CartItem): void {
    this.cartService.removeItemFromCart(item)
      .pipe()
      .subscribe({
        next: (cart) => this.message.success('Wycieczka została usunieta z koszyka'),
        error: (response) => this.message.error(response.error.message.message)
      })
  }

  public buy(): void {
    this.cartService.buy(this.cart).subscribe({
      next: () => {
        this.cdRef.detectChanges();
        this.message.success('Zakup zostal zrealizowany')
      },
      error: (response) => this.message.error(response?.error?.message?.message)
    })
  }

  ngOnInit() {
    this.currencyService.getSelectedCurrency()

      .subscribe((currency) => {
        this.selectedCurrency = currency;
        this.cdRef.detectChanges();
      });

    this.initCart();
  }

  private initCart() {
    this.cartService.cart$
      .pipe()
      .subscribe(cart => {
        this.cart = {...cart, items: cart.items.map(item => ({...item, selected: true}))};
        this.cdRef.detectChanges();
      })
  }
}
