import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
  FormBuilder, FormArray
} from '@angular/forms';
import {Trip} from "../../../../models/trip.model";
import {TripForm} from "../../../../models/trip-form";

@Component({
  selector: 'agh-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripFormComponent implements OnChanges {
  @Input() loading = false;
  @Output() onFormSubmit = new EventEmitter<TripForm>();
  @Input() tripData: Trip;

  tripForm = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
    country: this.fb.control('', [Validators.required]),
    address: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    capacity: this.fb.control(0, [Validators.required, Validators.min(1)]),
    available: this.fb.control(0, []),
    dateRange: this.fb.control([] as string[], [this.DateRangeValidator()]),
    price: this.fb.control(0, [Validators.required]),
    rating: this.fb.control(0),
    imageUrl: this.fb.control(''),
    gallery: this.fb.array<FormControl>([this.createGalleryControl()])
  });

  ngOnChanges(changes: SimpleChanges) {

    if (changes['tripData'].currentValue) {
      const tripData = changes['tripData'].currentValue;
      tripData.gallery.forEach((url: string, index: number) => {
        if (index === 0) return;
        this.tripForm.controls.gallery.controls.push(this.createGalleryControl(url));
      })
      this.tripForm.setValue({
        name: tripData.name,
        country: tripData.country,
        address: tripData.address,
        description: tripData.description,
        capacity: tripData.capacity,
        available: tripData.available,
        dateRange: [tripData.startAt, tripData.endAt],
        price: tripData.price,
        rating: tripData.rating,
        imageUrl: tripData.imageUrl,
        gallery: tripData.gallery
      });
    }
  }

  constructor(private readonly fb: FormBuilder) {
  }

  private createGalleryControl(value: string = ''): FormControl {
    return this.fb.control(value);
  }

  public addGalleryControl(value: string = ''): void {
    const items = this.tripForm.get('gallery') as FormArray<FormControl>;
    items.push(this.createGalleryControl(value))
  }

  public removeGalleryControl(control: { id: number, instance: FormControl }, e: MouseEvent) {
    e.preventDefault();
    const items = this.tripForm.controls.gallery.controls as FormControl<string>[];
    if (items.length > 1) {
      const index = items.indexOf(control.instance);
      items.splice(index, 1);
      this.tripForm.patchValue({ gallery: items.map(control => control.value) })
    }

  }

  DateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value.length === 0) {
        return {required: true}
      }
      return null;

    }
  }

  disabledDate = (current: Date): boolean => {
    return current && current < new Date();
  };

  onSubmit() {
    this.onFormSubmit.emit(this.tripForm.value as unknown as TripForm)
  }
}
