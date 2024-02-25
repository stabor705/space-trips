import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../../models/user.model";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'agh-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  public usersCollection$: Observable<User[]>;
  private loading$$ = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading$$.asObservable();

  constructor(
    private readonly usersService: UserService,
    private readonly messageService: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.usersCollection$ = this.usersService.getUsers()
  }

  public rolesChange(roles: string[], user: User, ) {
    const userToUpdate: User = {
      ...user,
      roles
    };

    this.updateUser(userToUpdate);
  }

  public toggleUserState(user: User): void {
    this.updateUser(user);
  }

  private updateUser(user: User): void {
    this.loading$$.next(true);
    this.usersService.updateUser(user)
      .subscribe({
        next: () => {
          this.messageService.create('success', `Użytkownik ${user.email} został zaktualizowany`);
        },
        error: () => {
          this.messageService.create('error', 'Coś poszło nie tak');
          this.loading$$.next(false);
        },
        complete: () => {
          this.loading$$.next(false);
        }
      })
  }
}
