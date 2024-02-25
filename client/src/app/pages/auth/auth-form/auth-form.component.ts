import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormOfType} from "../../../models/form-of-type.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'agh-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  @Input() title: string;
  @Input() submitLabel: string;
  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();

  public formGroup = this.fb.group<FormOfType<User>>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private readonly fb: FormBuilder) {
  }

  public submitForm(): void {
    this.onSubmit.emit(this.formGroup.value as User);
  }
}
