import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Url = 'https://awesometours.org/api/v1/users';
  private tokenName: string = 'jwt';

  private _isloggedIn = new BehaviorSubject(false);
  isloggedIn = this._isloggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(this.tokenName)) {
      this._isloggedIn.next(true);
    }
  }

  getUserById(userId: string): Observable<any> {
    const userUrl = `${this.Url}/${userId}`;
    return this.http.get<any>(userUrl).pipe(
      map((response) => {
        const users = response.data ? response.data.data : null;
        return users ? new User(users) : null;
      })
    );
  }

  getMyTours(userId: string): Observable<any> {
    const StringToken = localStorage.getItem('jwt');
    if (StringToken) {
      const tokenJson = JSON.parse(StringToken);
      // console.log(tokenJson.token);
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenJson.token}`
      );
      return this.http
        .get<any>(`${this.Url}/${userId}/bookings/my-tours`, {
          headers: headers,
        })
        .pipe(map((response) => (response.data ? response.data.bookings : [])));
    } else {
      console.log('invalid token');
      return of([]);
    }
  }

  updateUserData(userData: any): Observable<any> {
    const StringToken = localStorage.getItem('jwt');
    if (StringToken) {
      const tokenJson = JSON.parse(StringToken);
      // console.log(tokenJson.token);
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenJson.token}`
      );
      return this.http.patch<any>(`${this.Url}/updateMe`, userData, { headers });
    }
    return of([]);
  }

  uploadUserPhoto(photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    return this.http
      .post<any>(`${this.Url}/updateMe`, formData)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any): string {
    // Check if the error is an HttpErrorResponse
    if (error instanceof HttpErrorResponse) {
      console.error('An error occurred', error);
      let errorMessage = 'Unknown error occurred';

      // If there's a custom error message in the response body, use that
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        // If not, use the default error message from the HttpErrorResponse
        errorMessage = error.error.message;
      }

      // Display the error message in the console
      // console.log(errorMessage);

      // alert(errorMessage);

      // window.alert(errorMessage)
      // Return the error message
      return errorMessage;
    }

    // If it's not an HttpErrorResponse, return the original error message
    return error.message || 'Unknown error occurred';
  }

  public handleHttpError(error: any): any {
    // console.error(error);

    return this.handleError(error);


  }

  private userSubject = new BehaviorSubject<string>('');
  user$ = this.userSubject.asObservable();
  setUserEmail(email: string) {
    this.userSubject.next(email);
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.Url}/signup`, user, { headers })
      // .pipe(catchError(this.handleError));
  }

  login(credentials: any): Observable<any> {
    let querryParams = new HttpParams();
    querryParams = querryParams.append('credentials', credentials);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.Url}/login`, credentials, { headers })
      .pipe(
        tap((response: any) => {
          localStorage.setItem(this.tokenName, JSON.stringify(response));
          if (response) {
            this._isloggedIn.next(true);
          } else {
            this._isloggedIn.next(false);
          }
        })
      );
  }

  // Method to log out a user
  signout(): Observable<any> {
    return this.http
      .get<any>(`${this.Url}/logout`)
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    this._isloggedIn.next(false);
  }
  // Method to request a password reset
  requestPasswordReset(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.Url}/forgotPassword`, { email }, { headers })
      .pipe(catchError(this.handleError));
  }

  // Method to reset a user's password
  resetPassword(token: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .patch<any>(
        `${this.Url}/resetPassword/${token}`,
        { password: newPassword },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  // Method to update a user's password (requires authentication)
  updatePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .patch<any>(
        `${this.Url}/updatePassword`,
        { passwordCurrent: currentPassword, password: newPassword },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  getCurrentUser(): Observable<any> {
    let reqHeaders = localStorage.getItem(this.tokenName);
    console.log(reqHeaders);

    // this.tokenName = reqHeaders.token
    return this.http.get<any>(`${this.Url}/me`).pipe(
      map((response) => {
        // console.log(response);
        return {
          ...response,
          token: localStorage.getItem(this.tokenName), // Assuming the token is stored in localStorage
        };
      })
    );
  }
}
