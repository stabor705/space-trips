import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TripApiService} from "../../../../services/trip-api.service";
import {switchMap, tap} from "rxjs";
import {Trip} from "../../../../models/trip.model";

@Component({
  selector: 'agh-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripListComponent implements OnInit {
  public trips: Trip[];
  public allTrips: Trip[];
  public isLoading$ = this.tripService.loading$;
  protected readonly Array = Array;
  currentPage: number = 1;
  pageSize: number = 3;
  totalElements: number;

  constructor(
    private readonly tripService: TripApiService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.tripService.filters$
      .pipe(
        tap(() => this.tripService.setLoading(true)),
        switchMap((filters) => this.tripService.getTripsBufferedStream(filters))
      )
      .subscribe(trips => {
        this.allTrips = trips;
        this.totalElements = this.allTrips.length;
        this.tripService.setLoading(false);
        this.cdRef.detectChanges();
        this.loadTrips();
      })
  }

  private loadTrips(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.trips = this.allTrips.slice(startIndex, endIndex);
    this.cdRef.detectChanges();
  }


  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadTrips();
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.loadTrips();
  }
}
