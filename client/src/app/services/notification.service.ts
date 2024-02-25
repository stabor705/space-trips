import {Injectable} from '@angular/core';
import {ItemCart} from '../models/item-cart';
import {BehaviorSubject} from "rxjs";
import {Trip} from "../models/trip.model";
import {Order} from "../models/order";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
  }

  public readonly notifications = new BehaviorSubject<string[]>([])

  checkForUpcomingTrips(orders: Order[]): void {
    const now = new Date();
    const notifications: string[] = [];

    orders.forEach(order => {
      order.items.forEach(item => {
        const startAt = item.trip.startAt;
        const startAtDate = new Date(+startAt);
        const daysToTrip = this.calculateDaysBetweenDates(now, startAtDate);
        console.log(item.trip.name, daysToTrip, startAt, item.trip.startAt);
        if (daysToTrip > 0 && daysToTrip <= 13) {

          notifications.push(`Wycieczka ${item.trip.name} rozpoczyna się wkrótce!`);
        }
      });
    });

    if (notifications.length > 0) {
      this.notifications.next(notifications);
    }
  }

  private calculateDaysBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
  }
}
