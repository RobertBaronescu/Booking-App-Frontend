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

  amenities = [
    { name: 'Wifi', icon: 'wifi' },
    { name: 'Cable TV', icon: 'tv' },
    { name: 'Air conditioning', icon: 'snowflake' },
    { name: 'Heating', icon: 'thermometer-three-quarters' },
    { name: 'Toiletteries', icon: 'bath' },
    { name: 'Equipped Kitchen', icon: 'utensils' },
    { name: 'Desk for work', icon: 'laptop' },
    { name: 'Washing machine', icon: 'tshirt' },
  ];

  constructor(private http: HttpClient) {}

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

  postReview(review: Review, roomId: string): Observable<Review | any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    return this.http.post(
      `http://localhost:3000/room/${roomId}/add-review`,
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

    return this.http.post(
      'http://localhost:3000/rooms/add-room',
      room,
      httpOptions
    );
  }

  deleteRoom(roomId: string) {
    return this.http.delete(`http://localhost:3000/room/${roomId}/delete-room`);
  }
}
