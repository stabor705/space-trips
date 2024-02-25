import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, take, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(catchError((error) => {
      if (error.status === 401) {
        return this.handleHttpException(req, next)
      }
      return throwError(error);
    }));
  }

  private handleHttpException(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refreshToken()
      .pipe(
        take(1),
        switchMap(() => next.handle(request)),
        catchError((err) => {
          this.authService.logoutUser();
          this.router.navigateByUrl(`/auth/signin`);
          return throwError(request);
        })
      )
  }
}
