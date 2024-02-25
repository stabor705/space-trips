import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Order} from "../models/order";
import {environment} from "../../environment/environment";
import {Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthService
  ) {
  }

  getOrders(): Observable<Order[]> {
    const {base, orders} = environment.apiUrl;
    return this.authService.user
      .pipe(
        switchMap((user) => this.http.post<Order[]>(`${base}/${orders}`, {userId: user?._id})),
      )
  }
}
