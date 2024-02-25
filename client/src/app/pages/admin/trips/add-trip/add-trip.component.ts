import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TripForm} from "../../../../models/trip-form";
import {TripApiService} from "../../../../services/trip-api.service";
import {FormGroup} from "@angular/forms";
import {FormOfType} from "../../../../models/form-of-type.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {delay} from "rxjs";

@Component({
  selector: 'agh-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTripComponent {
  public loading = false;
  constructor(
    private readonly tripsService: TripApiService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
  ) {
  }

  formSubmit(form: TripForm) {
    this.loading = true;
    this.tripsService.createTrip(form)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['admin', 'trips', 'success'])
        },
        error: (response) => {
          this.messageService.create('error', 'Coś poszło nie tak');
        }
      })
  }
}
