import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, EMPTY, Observable, of, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class HttpExceptionsInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly authService:AuthService,
    private readonly messageService: NzMessageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(catchError((response) => {
      if (response.status === 409) {
        return this.handleSingleSessionException(response)
      }
      if (response.status === 403) {
        return this.handleForbiddenException()
      }
      return throwError(response);
    }));
  }

  private handleSingleSessionException(response: any): Observable<any> {
    this.messageService.warning(response?.error?.message)
    this.authService.logoutUser();
    this.router.navigateByUrl(`/`);
    return of(EMPTY)
  }

  private handleForbiddenException(): Observable<any> {
    this.authService.logoutUser();
    this.router.navigateByUrl(`/forbidden`);
    return of(EMPTY)
  }
}
