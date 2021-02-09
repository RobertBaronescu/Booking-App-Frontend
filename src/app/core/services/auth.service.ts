import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showHeaderAndFooter = new BehaviorSubject<boolean>(true);

  private token!: string;
  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(
      tap((response: any) => {
        const token = response.token;
        this.token = token;
        localStorage.setItem('access_token', this.token);
      }),
      catchError(this.handleError)
    );
  }


  signIn(user: any) {
    //modificat cu obiect, sa vina un obiect
    return this.http
      .post<{ token: string }>('http://localhost:3000/login', user)
      .pipe(
        tap((response: any) => {
          const token = response.token;
          this.token = token;
          localStorage.setItem('access_token', this.token);
        })
      );
  }

  signOut() {
    localStorage.removeItem('access_token');
  }

  getToken() {
    return this.token;
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  // doLogout() {
  //   let removeToken = localStorage.removeItem('access_token');
  //   if (removeToken == null) {
  //     this.router.navigate(['log-in']);
  //   }
  // }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}