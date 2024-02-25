import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {MainNavModule} from "./core/modules/main-nav/main-nav.module";
import {AuthService} from "./services/auth.service";
import {catchError, EMPTY, filter, take} from "rxjs";
import {CartApiService} from "./services/cart-api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzLayoutModule, MainNavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly cartService: CartApiService) {
  }

  ngOnInit() {
    this.initCart()
  }

  private initCart(): void {
    this.authService.loggedIn
      .pipe(filter(Boolean))
      .subscribe(() => this.cartService.getCart()
        .pipe(catchError(() => {
          this.cartService.emptyCart();
          return EMPTY
        }))
        .subscribe())
  }

}
