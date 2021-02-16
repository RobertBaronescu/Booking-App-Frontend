import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../interfaces/booking.interface';
import { BookingGuests } from '../interfaces/bookingGuests.interface';
import { Room } from '../interfaces/room.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = new BehaviorSubject<User | null>(null);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(
      `http://localhost:3000/register`,
      user,
      this.httpOptions
    );
  }

  changeUserPicture(user: { picture: string; id: string }) {
    return this.http.post(
      'http://localhost:3000/user/personal-info/userPicture',
      user,
      this.httpOptions
    );
  }

  changeUserName(user: { name: string; id: string }) {
    return this.http.post(
      'http://localhost:3000/user/personal-info/',
      user,
      this.httpOptions
    );
  }

  changeUserPassword(user: { password: string; id: string }) {
    return this.http.post(
      'http://localhost:3000/user/login-security',
      user,
      this.httpOptions
    );
  }

  createBooking(booking: Booking) {
    return this.http.post(
      'http://localhost:3000/booking/success',
      booking,
      this.httpOptions
    );
  }

  getBookings(userId: any) {
    return this.http.get(`http://localhost:3000/bookings/${userId}`);
  }

  getBookingsByHost(hostId: any): Observable<BookingGuests[]> {
    return this.http.get<BookingGuests[]>(
      `http://localhost:3000/bookings/rooms/host/${hostId}`
    );
  }

  deleteBooking(bookingId: any) {
    return this.http.delete(
      `http://localhost:3000/user/user-bookings/${bookingId}`
    );
  }

  constructor(private http: HttpClient) {}
}
