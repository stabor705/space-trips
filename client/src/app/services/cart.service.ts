import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Trip, TripId} from "../models/trip.model";
import {ItemCart} from "../models/item-cart";
import {PurchaseHistoryService} from "./purchase-history.service";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private readonly cart$$ = new BehaviorSubject<ItemCart[]>([]);
  constructor(private purchaseHistoryService: PurchaseHistoryService) {
  }

  addToCart(trip: Trip, count: number): void {
    const cartItems = this.cart$$.value;
    let isTripAlreadyInCart = false;

    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.tripId === trip._id) {
        isTripAlreadyInCart = true;
        return {
          ...cartItem,
          count: cartItem.count + count,
          total: (cartItem.count + count) * cartItem.price
        };
      }
      return cartItem;
    });

    if (!isTripAlreadyInCart) {
      const newCartItem: ItemCart = {
        tripId: trip._id,
        name: trip.name,
        price: trip.price,
        country: trip.country,
        description: trip.description,
        startAt: trip.startAt,
        endAt: trip.endAt,
        total: count * trip.price,
        count: count,
        isSelected: true,
        imageUrl: trip.imageUrl,
      };
      this.cart$$.next([...cartItems, newCartItem]);
    } else {
      this.cart$$.next(updatedCartItems);
    }
  }


  select(tripId: TripId): void {
    const cartItems = this.cart$$.value;
    const result = cartItems.map(cartItem => {
      if (cartItem.tripId === tripId) {
        return {
          ...cartItem,
          isSelected: !cartItem.isSelected,
        }
      }
      return cartItem;
    });
    this.cart$$.next(result);
  }

  deleteFromCart(tripId: TripId): void {
    const cartItems = this.cart$$.value;
    const result = cartItems.filter(cartItem => cartItem.tripId !== tripId);
    this.cart$$.next(result);
  }

  updateCartItem(tripId: TripId, count: number): void {
    const cartItems = this.cart$$.value;
    const result: ItemCart[] = cartItems.map(currentItem => {
      if (currentItem.tripId === tripId) {
        const newCount = currentItem.count + count;
        return {
          ...currentItem,
          count: newCount,
          total: newCount * currentItem.price,
          isSelected: true,
        }
      }
      return currentItem;


    })
    this.cart$$.next(result);
  }

  buy(): void {
    const cartItems = this.cart$$.value;
    const selectedItems = cartItems.filter(cartItem => cartItem.isSelected);
    this.purchaseHistoryService.addToHistory(selectedItems);

    const notSelectedItems = cartItems.filter(cartItem => !cartItem.isSelected);
    this.cart$$.next(notSelectedItems);
  }

  get cart$(): Observable<ItemCart[]> {
    return this.cart$$.asObservable();
  }
  calculateTotal(): number {
    const cartItems = this.cart$$.value;
    return cartItems
      .filter(item => item.isSelected)
      .reduce((total, item) => total + (item.price * item.count), 0);
  }
}
