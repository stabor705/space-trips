import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Review} from "../models/review";
import {Trip, TripId} from "../models/trip.model";

const {base, trips} = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  submitReview(tripId: TripId, review: Partial<Review>): Observable<any> {
    const url = `${base}/${trips}/${tripId}/feedback`;
    return this.http.post(url, {feedback: review});
  }

  removeReview(tripId: TripId, feedbackId: string): Observable<Trip> {
    const url = `${base}/${trips}/${tripId}/feedback/${feedbackId}`;
    return this.http.delete<Trip>(url);
  }
}
