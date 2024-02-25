import {ChangeDetectionStrategy, Component} from '@angular/core';

import {User} from "../../../models/user.model";
import {AuthService} from "../../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthResponse, ResponseType} from "../../../models/response";
import {Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'agh-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

  constructor(
    private readonly messageService: NzMessageService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly storageService: StorageService,
  ) {
  }

  public onSubmit(credentials: User): void {
    this.authService.signUpUser(credentials)
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
          this.messageService.create('error', `Użytkownik ${credentials.email} już istnieje`);
        }
      });
  }
}
