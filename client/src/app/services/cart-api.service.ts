import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError} from "rxjs";
import {Cart, CartItem} from "../models/cart";
import {environment} from "../../environment/environment";
import {Trip} from "../models/trip.model";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  private cartInit: Cart = {items: [], total: 0, userId: null}
  private readonly cart$$ = new BehaviorSubject<Cart>(this.cartInit)
  public readonly cart$ = this.cart$$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
  }

  getCart(): Observable<Cart> {
    const {base, cart} = environment.apiUrl;
    return this.authService.user
      .pipe(
        switchMap((user) => this.http.post<Cart>(`${base}/${cart}`, {userId: user?._id})),
        map((cart) => {
          this.cart$$.next(cart);
          return cart;
        }),
      )
  }

  emptyCart(): void {
    this.cart$$.next(this.cartInit);
  }

  addToCart(trip: Trip, quantity: number): Observable<Cart> {
    const {base, cart} = environment.apiUrl;
    return this.authService.user
      .pipe(
        switchMap((user) => this.http.post<Cart>(`${base}/${cart}/add`, {userId: user?._id, trip, quantity})),
        map((cart) => {
          this.cart$$.next(cart);
          return cart;
        })
      )
  }

  removeItemFromCart(cartItem: CartItem): Observable<Cart> {
    const {base, cart} = environment.apiUrl;
    return this.authService.user
      .pipe(
        switchMap((user) => this.http.post<Cart>(`${base}/${cart}/remove`, {
          userId: user?._id,
          cartItem,
        })),
        map((cart) => {
          this.cart$$.next(cart);
          return cart;

        })
      );
  }

  buy(cart: Cart): Observable<Cart> {
    const {base, cart: cartUrl} = environment.apiUrl;
    return this.authService.user.pipe(
      switchMap(user => this.http.post<Cart>(`${base}/${cartUrl}/buy`, { userId: user?._id, cart })),
      tap(updatedCart => {
        this.cart$$.next(updatedCart);
      }),
      catchError(error => {
        console.error('Error during purchase:', error);
        return throwError(() => new Error('Error during purchase'));
      })
    );
  }



  updateCartItem(cartItem: CartItem): Observable<Cart> {
    const {base, cart} = environment.apiUrl;
    return this.authService.user
      .pipe(
        switchMap((user) => this.http.patch<Cart>(`${base}/${cart}`, {
          userId: user?._id,
          cartItem
        })),
        map((cart) => {
          this.cart$$.next(cart);
          return cart;
        })
      );
  }

}
