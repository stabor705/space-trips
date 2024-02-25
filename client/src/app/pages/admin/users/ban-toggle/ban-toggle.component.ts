import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../models/user.model";

@Component({
  selector: 'agh-ban-toggle',
  templateUrl: './ban-toggle.component.html',
  styleUrl: './ban-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BanToggleComponent implements OnInit {
  @Input() user: User;
  @Input() loading = false;
  @Output() onToggle = new EventEmitter<User>();

  public banned: boolean

  ngOnInit() {
    this.banned = this.user.banned ?? false;
  }

  toggleState() {
    this.banned = !this.banned;
    this.onToggle.emit({...this.user, banned: this.banned})
  }
}
