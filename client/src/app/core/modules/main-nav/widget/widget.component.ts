import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../../../services/currency.service";
import {CartApiService} from "../../../../services/cart-api.service";
import {Cart} from "../../../../models/cart";


@Component({
  selector: 'agh-widget',
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent implements OnInit {
  cart: Cart = {items: [], total: 0, userId: null};
  selectedCurrency: string;

  constructor(private cartService: CartApiService, private readonly currencyService: CurrencyService, private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cartService.cart$
      .pipe()
      .subscribe(cart => {
        this.cart = cart;
        this.cdRef.detectChanges();
      })

    this.currencyService.getSelectedCurrency()

      .subscribe((currency) => {
        this.selectedCurrency = currency;
        this.cdRef.detectChanges();
      });
  }
}
