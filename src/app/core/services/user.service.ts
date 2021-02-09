import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient) {}
}
