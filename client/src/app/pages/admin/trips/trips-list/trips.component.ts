import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {first, Observable} from "rxjs";

import {NzMessageService} from "ng-zorro-antd/message";
import {Trip} from "../../../../models/trip.model";
import {TripApiService} from "../../../../services/trip-api.service";

@Component({
  selector: 'agh-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsComponent {
  public trips$: Observable<Trip[]>;

  constructor(private readonly tripService: TripApiService, private readonly message: NzMessageService, private readonly cd: ChangeDetectorRef){
  }


  ngOnInit() {
    this.trips$ = this.tripService.findTrips();
    //this.tripService.search();
  }

  deleteTrip(trip: Trip): void {
    this.tripService.deleteTrip(trip._id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.message.success('Wycieczka została usunięta');
          this.refreshTrips();
        },
        error: (err) => {

          console.error('Wystąpił błąd podczas usuwania wycieczki', err);
        }
      });
  }

  cancel(): void {
  }

  refreshTrips(): void {
    this.trips$ = this.tripService.findTrips();
    this.cd.detectChanges();
  }
}
