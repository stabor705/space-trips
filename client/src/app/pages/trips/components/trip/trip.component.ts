import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Trip, TripId} from "../../../../models/trip.model";
import {pl_PL} from "ng-zorro-antd/i18n";
import {TripService} from "../../../../services/trip.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {filter, first, take} from "rxjs";
import {CartService} from "../../../../services/cart.service";
import {CurrencyService} from "../../../../services/currency.service";
import {Router} from "@angular/router";
import {Roles} from "../../../../models/role";
import {CartApiService} from "../../../../services/cart-api.service";
import {User} from "../../../../models/user.model";
import {AuthService} from "../../../../services/auth.service";
import {TripApiService} from "../../../../services/trip-api.service";

@Component({
  selector: 'agh-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  defaultQuantity = 1;

  selectedCurrency: string;
  loggedIn$ = this.authService.loggedIn;
  rateLabels = ['okropna', 'słaba', 'spoko', 'dobra', 'bardzo dobra', 'wspaniała'];


  constructor(
    private router: Router,
    private readonly tripService: TripApiService,
    private readonly message: NzMessageService,
    private readonly cartService: CartApiService,
    private readonly currencyService: CurrencyService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.currencyService.getSelectedCurrency()
      .subscribe((currency) => {
      this.selectedCurrency = currency;
      this.cdRef.detectChanges();
    });

  }

  addToCart(trip: Trip, count: number): void {
    this.cartService.addToCart(trip, count)
      .pipe()
      .subscribe({
        next: (cart) => this.message.success('Wycieczka została dodana do rezerwacji'),
        error: (response) => this.message.error(response.error.message.message)
      })
  }

  deleteTrip(trip: Trip): void {
    this.tripService.delete(trip._id)
      .pipe(first())
      .subscribe(() => {
        this.message.success('Wycieczka została usunięta')
      })
  }


  cancel(): void {
  }

  protected readonly pl_PL = pl_PL;
  protected readonly Roles = Roles;

}
