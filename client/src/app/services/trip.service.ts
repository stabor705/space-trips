import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  delay,
  map,
  Observable, of,
  switchMap,
  tap
} from "rxjs";
import {Trip, TripId} from "../models/trip.model";
import {FilterForm} from "../models/filter-form.model";
import {TripForm} from "../models/trip-form";

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private initialFilters: FilterForm = {name: '', country: '', priceRange: [0, 0], ratingRange: [0, 6]};
  private readonly trips$$ = new BehaviorSubject<Trip[]>([]);
  private readonly filteredTrips$$ = new BehaviorSubject<Trip[]>([]);
  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly filters$$ = new BehaviorSubject<FilterForm>(this.initialFilters);

  constructor(private readonly http: HttpClient) {
    this.loadTrips();
  }

  loadTrips(): void {
    this.http.get<Trip[]>('http://localhost:4200/assets/trips.json')
      .subscribe(trips => {
        this.trips$$.next(trips)
      })
  }

  search(): void {
    this.filters$$
      .pipe(
        switchMap((filters) => {
          return this.trips$$
            .pipe(
              tap(() => this.loading$$.next(true)),
              delay(Math.floor(Math.random() * 1500)),
              map((trips) => {
                return this.filterTrips(trips, filters);
              }),
              tap(() => this.loading$$.next(false)),
            )
        }),
      ).subscribe((trips) => {
      this.filteredTrips$$.next(trips);
    })
  }

  delete(tripId: TripId): Observable<boolean> {
    const trips = this.trips$$.value;
    const result = trips.filter(trip => trip._id !== tripId);
    this.trips$$.next(result);
    return of(true);
  }


  get trips(): Trip[] {
    return this.filteredTrips$$.getValue();
  }

  get trips$(): Observable<Trip[]> {
    return this.filteredTrips$$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.loading$$.asObservable();
  }

  setFilters(filters: FilterForm): void {
    this.filters$$.next(filters);
  }

  private filterTrips(collection: Trip[], filters: FilterForm): Trip[] {
    return collection
      .filter(trip => this.filterByTripName(trip, filters))
      .filter(trip => this.filterByTripCountry(trip, filters))
      .filter(trip => this.filterByTripPrice(trip, filters))
  }

  private filterByTripName(trip: Trip, filters: FilterForm): boolean {
    return trip.name.toLowerCase().includes(filters.name.toLowerCase())
  }

  private filterByTripCountry(trip: Trip, filters: FilterForm): boolean {
    return trip.country.includes(filters.country);
  }

  private filterByTripPrice(trip: Trip, filters: FilterForm): boolean {
    const [min, max] = filters.priceRange
    if (!min || !max) {
      return true;
    }
    return trip.price >= min && trip.price <= max;
  }

  private generateId(): string {
    return (this.trips$$.value.length + 1).toString();
  }

  addTrip(trip: TripForm): Observable<boolean> {
    try {
      const startAt = `${trip.dateRange[0]?.getFullYear()}-${(trip.dateRange[0] as Date).getMonth() + 1}-${trip.dateRange[0]?.getDate()}`;
      const endAt = `${trip.dateRange[1]?.getFullYear()}-${(trip.dateRange[1] as Date).getMonth() + 1}-${trip.dateRange[1]?.getDate()}`;
      const newTrip: Trip = {...trip, _id: this.generateId(), available: trip.capacity, startAt, endAt};
      const trips = this.trips$$.value;
      const result = [...trips, newTrip];
      this.trips$$.next(result);
      return of(true);
    } catch (e) {
      return of(false);
    }

  }

}
