import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";

const TOKEN_KEY = 'agh_trips_access_token';
const REFRESH_TOKEN_KEY = 'agh_trips_refresh_token';
const SESSION_KEY = 'agh_trips_session_id';
const USER_KEY = 'agh_trips_user';
const CART_KEY = 'agh_trips_cart';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  accessToken$ = new BehaviorSubject<string | null>(this.getAccessToken())
  refreshToken$ = new BehaviorSubject<string | null>(this.getRefreshToken())
  sessionId$ = new BehaviorSubject<string | null>(this.getSessionId())
  user$ = new BehaviorSubject<User | null>(this.getUser())

  public setAccessToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.accessToken$.next(token);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    this.refreshToken$.next(token);
  }

  public destroyRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.refreshToken$.next(null);
  }

  private getSessionId(): string | null {
    return localStorage.getItem(SESSION_KEY);
  }

  public setSessionId(id: string): void {
    localStorage.setItem(SESSION_KEY, id);
    this.sessionId$.next(id);
  }

  public destroySessionId(): void {
    localStorage.removeItem(SESSION_KEY);
    this.sessionId$.next(null);
  }

  public destroyAccessToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.accessToken$.next(null);
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user$.next(user);
  }

  public destroyUser(): void {
    localStorage.removeItem(USER_KEY);
    this.user$.next(null);
  }

  private getUser(): User | null {
    const user = localStorage.getItem(USER_KEY)
    return user && JSON.parse(user);
  }
}
