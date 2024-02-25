import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'agh-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleSelectorComponent {
  @Input() selectedRoles: string[] = [];
  @Output() onChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public listOfRoles: string[] = ['KLIENT', 'MANANGER', 'ADMIN'];

  public isNotSelected(value: string): boolean {
    return this.listOfRoles.some((v) => v ===value);
  }

  public selectionChange(roles: string[]): void {
    this.onChange.emit(roles)
  }
}
