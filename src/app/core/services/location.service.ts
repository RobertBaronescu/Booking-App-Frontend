import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('http://localhost:3000/locations');
  }

  getLocation(id: string): Observable<Location> {
    return this.http.get<Location>(`http://localhost:3000/location/${id}`);
  }

  getLocationByRoomId(roomId: string): Observable<string> {
    return this.http.get<string>(
      `http://localhost:3000/rooms/location/${roomId}`
    );
  }
}
