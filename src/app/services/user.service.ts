import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = "http://127.0.0.1:3004/api/v1/users";


  constructor(private http : HttpClient) { }
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
      console.log(errorMessage);
      
      // window.alert(errorMessage)
      // Return the error message
      return errorMessage;
    }
  
    // If it's not an HttpErrorResponse, return the original error message
    return error.message || 'Unknown error occurred';
  }
  
  public handleHttpError(error: any): string {
    return this.handleError(error);
  }

  private userSubject = new BehaviorSubject<string>('');
  user$ = this.userSubject.asObservable();
  setUserEmail(email : string)
  {
    this.userSubject.next(email);
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.Url}/signup`, user, { headers })
      .pipe(catchError(this.handleError));
  }

  
  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.Url}/login`, credentials, { headers })
      .pipe(catchError(this.handleError));
  }

  // Method to log out a user
  logout(): Observable<any> {
    return this.http
      .get<any>(`${this.Url}/logout`)
      .pipe(catchError(this.handleError));
  }

  // Method to request a password reset
  requestPasswordReset(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(
        `${this.Url}/forgotPassword`,
        { email },
        { headers }
      )
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
}
