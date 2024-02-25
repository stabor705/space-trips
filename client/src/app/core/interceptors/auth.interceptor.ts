import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {StorageService} from "../../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.storage.accessToken$.value;
    const sessionId = this.storage.sessionId$.value;
    if (accessToken) {
      const tokenizedRequet = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
                            .set('SessionId', `${sessionId}`)
      });

      return next.handle(tokenizedRequet);
    }
    return next.handle(req);
  }
}
