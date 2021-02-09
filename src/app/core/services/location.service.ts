import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
}
