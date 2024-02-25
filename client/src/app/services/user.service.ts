import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    const {base, users} = environment.apiUrl;
    return this.http.get<User[]>(`${base}/${users}`);
  }

  public updateUser(user: User): Observable<User> {
    const {base, users} = environment.apiUrl;
    return this.http.patch<User>(`${base}/${users}`, {user});
  }

  private handleError(error: any) {
    let errorMessage = 'Wystąpił nieoczekiwany błąd';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Błąd: ${error.error.message}`;
    } else {
      errorMessage = `Kod błędu: ${error.status}\nWiadomość: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
