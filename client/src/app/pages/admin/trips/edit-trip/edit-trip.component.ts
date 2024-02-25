import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from "@angular/forms";
import {Trip} from "../../../../models/trip.model";
import {Observable, Subscription, switchMap} from "rxjs";
import {TripApiService} from "../../../../services/trip-api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";
import {TripForm} from "../../../../models/trip-form";

@Component({
  selector: 'agh-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTripComponent implements OnInit {
  @Input() tripId: string;
  @Input() loading = false;
  @Output() onFormSubmit = new EventEmitter();
  trip: Trip;

  constructor(private readonly fb: FormBuilder,
              private route: ActivatedRoute,
              private readonly tripService: TripApiService,
              private cdRef: ChangeDetectorRef,
              private readonly router: Router,
              private readonly messageService: NzMessageService) {
  }

  initTrip(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.tripId = params['id'];
        return this.tripService.getTrip(this.tripId);
      }),
    ).subscribe((trip: Trip) => {
      this.trip = trip;
      this.cdRef.detectChanges();
    })
  }


  ngOnInit() {
    this.initTrip()

  }

  onEditSubmit(form: TripForm) {
    this.loading = true;
    this.tripService.updateTrip(this.tripId, form).subscribe({
      next: (response) => {
        this.loading = false;
        this.messageService.success('Wycieczka zaktualizowana');
        this.router.navigate(['admin', 'trips'])
      },
      error: (response) => {
        this.messageService.error( 'Coś poszło nie tak');
      }
    });
  }


}
