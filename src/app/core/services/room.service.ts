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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('http://localhost:3000/rooms');
  }

  getRoomsByHost(hostId: string): Observable<Room[]> {
    return this.http.get<Room[]>(`http://localhost:3000/rooms/host/${hostId}`);
  }

  getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(`http://localhost:3000/rooms/${roomId}`);
  }

  updateRoom(roomId: string, room: Room) {
    return this.http.put(
      `http://localhost:3000/room/edit/${roomId}`,
      room,
      this.httpOptions
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

  postRoom(room: Room) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const httpOptions = {
      headers: headers,
    };

    return this.http.post('http://localhost:3000/add-room', room, httpOptions);
  }
}
