import {Injectable} from '@angular/core';
import {Trip, TripId} from "../models/trip.model";
import {BehaviorSubject, catchError, map, Observable, of, ReplaySubject, throwError} from "rxjs";
import {environment} from "../../environment/environment";
import {HttpClient, HttpErrorResponse, HttpParamsOptions} from "@angular/common/http";
import {FilterForm} from "../models/filter-form.model";
import {TripForm, TripFormDTO} from "../models/trip-form";
import {ResponseBase} from "../models/response";
import {Router, UrlSerializer} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Review} from "../models/review";
const {base, trips} = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TripApiService {
  private initialFilters: FilterForm = {name: '', country: '', priceRange: [0, Infinity],ratingRange:[0,6]};
  private readonly filters$$ = new BehaviorSubject<FilterForm>(this.initialFilters);
  private readonly trips$$ = new BehaviorSubject<Trip[]>([]);
  private readonly loading$$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private readonly router: Router,private serializer: UrlSerializer, private readonly messageService: NzMessageService){
  }

  getTrip(id: TripId): Observable<Trip> {
    const {base, trips} = environment.apiUrl
    return this.http.get<Trip>(`${base}/${trips}/${id}`).pipe(catchError((error) => this.handleError(error)));
  }


  submitReview(tripId: TripId, review: Partial<Review>): Observable<Trip> {
    const url = `${base}/${trips}/${tripId}/feedback`;
    return this.http.post<Trip>(url, { feedback: review }).pipe(
      catchError((error) => this.handleError(error)),
      map((updatedTrip: Trip) => {
        this.updateLocalTripsData(updatedTrip);
        return updatedTrip;
      })
    );
  }
  private updateLocalTripsData(updatedTrip: Trip): void {
    const currentTrips = this.trips$$.getValue();
    const updatedTrips = currentTrips.map(trip =>
      trip._id === updatedTrip._id ? updatedTrip : trip
    );
    this.trips$$.next(updatedTrips);
  }




  updateTrip(tripId: TripId, trip: TripForm): Observable<ResponseBase> {
    const {base, trips} = environment.apiUrl
    const updatedTrip: TripFormDTO = {
      ...trip,
      available: trip.capacity,
      startAt: trip.dateRange[0].valueOf(),
      endAt: trip.dateRange[1].valueOf()
    }
    return this.http.put<ResponseBase>(`${base}/${trips}/${tripId}`, updatedTrip).pipe(catchError((error) => this.handleError(error)));
  }

  delete(tripId: TripId): Observable<boolean> {
    const {base, trips} = environment.apiUrl
    return this.http.delete<boolean>(`${base}/${trips}/${tripId}`)
  }

  findTrips(filters?: FilterForm): Observable<Trip[]> {
    const {base, trips} = environment.apiUrl;
    const queryParams: HttpParamsOptions['fromObject'] = {
      ...filters
    }
    return this.http.get<Trip[]>(`${base}/${trips}`, {params: queryParams})
      .pipe(
        map((trips) => {
          this.trips$$.next(trips);
          return trips
        })
      );
  }

  getTripsBufferedStream(filters?: FilterForm): Observable<Trip[]> {
    const {base, trips} = environment.apiUrl;
    const queryParams = this.router.createUrlTree(['socket'], {queryParams: filters})
    const serializedParams = this.serializer.serialize(queryParams);
    const sourceUrl = `${base}/${trips}${serializedParams}`
    const eventSource = new EventSource(sourceUrl);
    const streamedTrips: ReplaySubject<Trip[]> = new ReplaySubject<Trip[]>(Number.POSITIVE_INFINITY);

    eventSource.addEventListener('message', (event) => {
      if (!streamedTrips.observed) {
        return this.stopTripsStream(eventSource, streamedTrips);
      }

      streamedTrips.next(JSON.parse(event.data).trips);
      this.trips$$.next(JSON.parse(event.data).trips);
    })

    eventSource.addEventListener('error', (error) => {
      console.log('SSE error:', error);
      return this.stopTripsStream(eventSource, streamedTrips);
    })

    eventSource.addEventListener('COMPLETE', () => this.stopTripsStream(eventSource, streamedTrips))

    return streamedTrips.asObservable();
  }

  private stopTripsStream(eventSource: EventSource, streamedTrips: ReplaySubject<Trip[]>): void {
    eventSource.close();
    streamedTrips.complete();
  }

  createTrip(trip: TripForm): Observable<ResponseBase> {
    const {base, trips} = environment.apiUrl;
    const newTrip: TripFormDTO = {
      ...trip,
      available: trip.capacity,
      startAt: trip.dateRange[0].valueOf(),
      endAt: trip.dateRange[1].valueOf()
    }
    return this.http.post<ResponseBase>(`${base}/${trips}`, newTrip).pipe(catchError((error) => this.handleError(error)));
  }

  deleteTrip(tripId: TripId): Observable<unknown> {
    const {base, trips} = environment.apiUrl;
    return this.http.delete(`${base}/${trips}/${tripId}`).pipe(
      catchError((error) => this.handleError(error))

    )
  }

  setFilters(filters: FilterForm): void {
    this.filters$$.next(filters);
  }

  setLoading(loading: boolean): void {
    this.loading$$.next(loading);
  }

  get trips$(): Observable<Trip[]> {
    return this.trips$$.asObservable();
  }

  get filters$(): Observable<FilterForm> {
    return this.filters$$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.loading$$.asObservable();
  }

  private handleError(response: HttpErrorResponse) {
    this.messageService.error(response.error.message);
    return throwError(response);
  }



}
