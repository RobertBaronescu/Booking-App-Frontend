import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../interfaces/review.interface';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  bookingDetails = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('http://localhost:3000/rooms');
  }

  getRoom(id: string | null, locationId: string | null) {
    return this.http.get<Room>(
      `http://localhost:3000/location/${locationId}/rooms/${id}`
    );
  }

  postReview(
    review: Review,
    locationId: string,
    roomId: string
  ): Observable<Review | any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post(
      `http://localhost:3000/location/${locationId}/rooms/${roomId}`,
      review,
      httpOptions
    );
  }
}
