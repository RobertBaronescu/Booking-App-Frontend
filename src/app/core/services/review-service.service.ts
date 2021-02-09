import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewServiceService {
  constructor(private http: HttpClient) {}

  getReviews(locationId: string, roomId: string): Observable<Review[] | any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.get<Review[] | any>(
      `localhost:3000/location/${locationId}/rooms/${roomId}/reviews`,
      httpOptions
    );
  }

 
}
