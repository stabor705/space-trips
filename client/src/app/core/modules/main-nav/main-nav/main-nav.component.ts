import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {User} from "../../../../models/user.model";
import {CurrencyService} from "../../../../services/currency.service";
import {AuthService} from "../../../../services/auth.service";
import {CartApiService} from "../../../../services/cart-api.service";

@Component({
  selector: 'agh-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent implements OnInit, OnDestroy {
  public selectedCurrency = new FormControl('PLN');
  public loggedIn$ = this.authService.loggedIn;
  public readonly cart$ = this.cartService.cart$;
  public readonly onDestroy$ = new Subject();
  public user$: Observable<User | null>;

  constructor(
    private readonly cartService: CartApiService,
    private readonly currencyService: CurrencyService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: NzMessageService
  ) {
  }

  ngOnInit() {
    this.user$ = this.authService.user;
    this.selectedCurrency.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((newCurrency) => {
        if (newCurrency) {
          this.currencyService.setSelectedCurrency(newCurrency);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  public logoutUser(): void {
    this.authService.logoutUser();
    this.cartService.emptyCart();
    this.messageService.create('success', 'Użytkownik wylogowany')
    this.router.navigate(['/'])
  }

}

