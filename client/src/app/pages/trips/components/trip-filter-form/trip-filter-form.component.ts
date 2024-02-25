import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormOfType} from "../../../../models/form-of-type.model";
import {FormBuilder} from "@angular/forms";
import {FilterForm} from "../../../../models/filter-form.model";
import {TripService} from "../../../../services/trip.service";
import {debounceTime, filter, first, tap} from "rxjs";
import {Trip} from "../../../../models/trip.model";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {TripApiService} from "../../../../services/trip-api.service";

@Component({
  selector: 'agh-trip-filter-form',
  templateUrl: './trip-filter-form.component.html',
  styleUrl: './trip-filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripFilterFormComponent implements OnInit {
  tripsCountries: string[];
  trips: Trip[];
  @ViewChild(NzSliderComponent) slider: NzSliderComponent;

  public filterForm = this.fb.group<FormOfType<FilterForm>>({
    name: this.fb.control(''),
    country: this.fb.control(''),
    priceRange: this.fb.control(null),
    ratingRange: this.fb.control([0, 6])
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly tripService: TripApiService,
  ) {
  }

  ngOnInit() {
    this.initFilters();
    this.filterForm.valueChanges
      .pipe(
        tap(() => this.tripService.setLoading(true)),
        debounceTime(300)
      )
      .subscribe(form => {
        const filters: FilterForm = {
          name: form.name as string,
          country: form.country === null ? '' : form.country as string,
          priceRange: form.priceRange as [number, number],
          ratingRange: form.ratingRange as [number, number]
        }
        this.tripService.setFilters(filters);
      })
  }

  private initFilters(): void {
    this.tripService.trips$
      .pipe(
        filter((trips) => !!trips.length),
        first()
      )
      .subscribe(trips => {
        this.trips = trips;
        this.setTripsCountrie(trips);
        this.setTripsPriceRange(trips)

      })
  }

  private setTripsCountrie(trips: Trip[]): void {
    this.tripsCountries = [...new Set(trips.map(trip => trip.country))];
  }

  private setTripsPriceRange(trips: Trip[]): void {
    if (!this.trips?.length) {
      return
    }
    const prices = trips.map(trip => trip.price).sort((a, b) => a - b);
    const tripsPricesRange: [number, number] = [prices[0], prices[prices.length - 1]]
    this.slider.nzMin = tripsPricesRange[0];
    this.slider.nzMax = tripsPricesRange[1];
    this.filterForm.patchValue({priceRange: tripsPricesRange}, { emitEvent: false})
  }

}
