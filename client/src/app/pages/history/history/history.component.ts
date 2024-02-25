import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { OrdersApiService } from "../../../services/orders-api.service";
import { CurrencyService } from "../../../services/currency.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subject, takeUntil } from "rxjs";
import { Order } from "../../../models/order";
import { Trip } from "../../../models/trip.model";

@Component({
  selector: 'agh-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, OnDestroy {
  orders: Order[];
  selectedCurrency: string;
  private onDestroy$ = new Subject<void>();
  selectedStatus: string = '';
  filteredOrders: Order[] = [];

  constructor(
    private readonly purchaseHistoryService: OrdersApiService,
    private readonly currencyService: CurrencyService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly nzNotificationService: NzNotificationService,
  ) {}

  onStatusChange() {
    if (this.selectedStatus === '') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.map(order => ({
        ...order,
        items: order.items.filter(item => this.determineTripStatus(item.trip) === this.selectedStatus)
      })).filter(order => order.items.length > 0);
    }
  }

  determineTripStatus(trip: Trip): string {
    const now = new Date().getTime();
    const startDate = new Date(+trip.startAt).getTime();
    const endDate = trip.endAt ? new Date(trip.endAt).getTime() : Infinity;

    if (startDate > now) {
      return 'Oczekuje na rozpoczęcie';
    } else if (now >= startDate && now <= endDate) {
      return 'W trakcie trwania';
    } else if (now > endDate) {
      return 'zakończona';
    } else {
      return 'Nieokreślony';
    }
  }

  checkForUpcomingTrips(orders: Order[]): void {
    const now = new Date();
    const notifications: string[] = [];

    orders.forEach(order => {
      order.items.forEach(item => {
        const startAt = item.trip.startAt;
        const startAtDate = new Date(+startAt);
        const daysToTrip = this.calculateDaysBetweenDates(now, startAtDate);
        console.log(item.trip.name, daysToTrip, startAt, item.trip.startAt);
        if (daysToTrip > 0 && daysToTrip <= 7) {
          notifications.push(`Wycieczka ${item.trip.name} rozpoczyna się wkrótce!`);
        }
      });
    });

    if (notifications.length >= 0) {
      notifications.forEach(notification => {
        this.nzNotificationService.blank('Zbliżająca się wycieczka!', notification, {});
      });
    }
  }

  private calculateDaysBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
  }

  ngOnInit() {
    this.purchaseHistoryService.getOrders()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(orders => {
        this.orders = orders;
        this.filteredOrders = orders;
        this.cdRef.detectChanges();
        this.checkForUpcomingTrips(orders);
      });

    this.currencyService.getSelectedCurrency()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(currency => {
        this.selectedCurrency = currency;
        this.cdRef.detectChanges();
      });
  }

  getPanelHeader(trip: Trip): string {
    const status = this.determineTripStatus(trip);
    return `Zamówienie ${trip.name} - Status: ${status}`;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
