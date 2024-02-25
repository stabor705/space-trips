import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {catchError, map, Observable, of, switchMap, take} from "rxjs";
import {AuthResponse} from "../models/response";
import {StorageService} from "./storage.service";
import {CartApiService} from "./cart-api.service";
import {Roles} from "../models/role";

const API_BASE_URL = 'http://localhost:4201'
const AUTH_API_BASE = 'auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) {
  }

  get loggedIn(): Observable<boolean> {
    return this.storageService.accessToken$.pipe(map(token => !!token));
  }

  get user(): Observable<User | null> {
    return this.storageService.user$;
  }

  public isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map(user => {
        if (user && user.roles) {
          return user.roles.includes(Roles.admin);
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }


  public isAdminOrManager(): Observable<boolean> {
    return this.user.pipe(
      map(user => {
        if (user && user.roles) {
          return user.roles.some(role => role === Roles.admin || role === Roles.manager);
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  public signInUser(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/${AUTH_API_BASE}/login`, credentials)
      .pipe(
        map((res) => {
          if (res?.user) {
            this.storageService.setUser(res?.user);
          }
          return res;
        })
      );
  }

  public logoutUser(): void {
    this.storageService.destroyAccessToken();
    this.storageService.destroyRefreshToken();
    this.storageService.destroySessionId();
    this.storageService.destroyUser();
  }

  public signUpUser(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/${AUTH_API_BASE}/register`, credentials)
      .pipe(
        map((res) => {
          if (res?.user) {
            this.storageService.setUser(res?.user);
          }
          return res;
        })
      );
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.storageService.refreshToken$.pipe(
      take(1),
      switchMap((refreshToken) => {
        return this.http.post<AuthResponse>(`${API_BASE_URL}/${AUTH_API_BASE}/refreshToken`, {refreshToken})
          .pipe(
            map((response) => {
              console.log('auth response', response);
              const {accessToken, refreshToken, sessionId} = response
              this.storageService.setAccessToken(accessToken || '');
              this.storageService.setRefreshToken(refreshToken || '');
              this.storageService.setSessionId(sessionId || '');
              return response;
            }),
          );
      }),
    )
  }

}
