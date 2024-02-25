import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnDestroy, OnInit} from '@angular/core';
import {filter, map, Observable, Subscription, switchMap, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Trip, TripId} from "../../../../models/trip.model";
import {TripApiService} from "../../../../services/trip-api.service";
import {CurrencyService} from "../../../../services/currency.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Roles} from "../../../../models/role";
import {CartService} from "../../../../services/cart.service";
import {CommentService} from "../../../../services/comment.service";
import {Review} from "../../../../models/review";
import {AuthService} from "../../../../services/auth.service";
import {User} from "../../../../models/user.model";
import {OrdersApiService} from "../../../../services/orders-api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CartApiService} from "../../../../services/cart-api.service";


@Component({
  selector: 'agh-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripDetailsComponent implements OnInit, OnDestroy {
  tripId: TripId;
  trip: Trip;
  defaultQuantity = 1;
  center: google.maps.LatLngLiteral;
  zoom = 8;
  user: User;
  selectedCurrency: string;
  canReview$: Observable<boolean>;
  rateLabels = ['okropna', 'słaba', 'spoko', 'dobra', 'bardzo dobra', 'wspaniała'];

  protected readonly Roles = Roles;

  reviewForm = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    nick: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    orderDate: new FormControl('')
  });

  get didNotVote(): boolean {
    if (this.user?._id) {
      return !this.trip.feedback.some(review => review.userId?.valueOf() === this.user._id?.valueOf() as string)
    }
    return false;
  }

  onSubmitReview() {
    if (this.reviewForm.valid) {
      const review: Partial<Review> = this.reviewForm.value;
      this.tripService.submitReview(this.tripId, review).subscribe({
        next: () => {
          this.initTrip();
          this.reviewForm.reset();
        },
        error: (error) => {
          console.error('Wystąpił błąd podczas wysyłania recenzji', error);
        }
      });
    } else {
      console.error('Formularz zawiera błędy');
    }
  }

  constructor(
    private readonly commentService: CommentService,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly tripService: TripApiService,
    private readonly currencyService: CurrencyService,
    private readonly cartService: CartApiService,
    private readonly authService: AuthService,
    private readonly ordersService: OrdersApiService,
    private readonly message: NzMessageService,
  ) {

  }

  addToCart(trip: Trip, count: number): void {
    this.cartService.addToCart(trip, count)
      .pipe()
      .subscribe({
        next: (cart) => this.message.success('Wycieczka została dodana do rezerwacji'),
        error: (response) => this.message.error(response.error.message.message)
      })
  }

  initTrip(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.tripId = params['id'];
        return this.tripService.getTrip(this.tripId);
      }),
    ).subscribe((trip: Trip) => {
      this.trip = trip;
      const [lat, lng] = trip.address.split(',').map(Number);
      this.center = {lat, lng};
      this.cdRef.detectChanges();
    })
  }

  ngOnInit() {
    this.initTrip();
    this.currencyService.getSelectedCurrency()
      .subscribe((currency) => {
        this.selectedCurrency = currency;
        this.cdRef.detectChanges();
      });

    this.authService.user.pipe(filter(Boolean), take(1)).subscribe(user => this.user = user);

    this.canReview$ = this.ordersService.getOrders()
      .pipe(
        take(10),
        map((orders) =>
          (orders.some((order) =>
              order.items.some((item) =>
                item.trip._id.valueOf() === this.tripId
              )
            )
          ))
      );
  }

  ngOnDestroy(): void {
  }

}
