import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {User} from "../../../models/user.model";
import {AuthResponse, ResponseType} from "../../../models/response";

@Component({
  selector: 'agh-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {

  constructor(
    private readonly messageService: NzMessageService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly storageService: StorageService,
  ) {
  }

  public onSubmit(credentials: User): void {
    this.authService.signInUser(credentials)
      .subscribe({
        next: (response: AuthResponse) => {
          const {type, message, accessToken, refreshToken, sessionId} = response;
          this.messageService.create(type, message);
          if (type === ResponseType.SUCCESS && accessToken && refreshToken && sessionId) {
            this.storageService.setAccessToken(accessToken)
            this.storageService.setRefreshToken(refreshToken)
            this.storageService.setSessionId(sessionId)
            this.router.navigate(['trips']);
          }
        },
        error: () => {
          this.messageService.create('error', `Niepoprawne dane logowania`);
        }
      });
  }
}
