import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://awesometours.org/api/v1/bookings/';
  private deleteUrl = 'http://awesometours.org/api/v1/users/';

  constructor(private http: HttpClient) {}

  createCheckoutSession(tourId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}checkout-session/${tourId}`, {
      headers,
    });
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, bookingData);
  }

  getBooking(bookingId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${bookingId}`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  updateBooking(bookingId: string, updateData: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${bookingId}`, updateData);
  }

  deleteBooking(userId: string, bookingId: string): Observable<any> {
    const StringToken = localStorage.getItem('jwt');
    if (StringToken) {
      const tokenJson = JSON.parse(StringToken);
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${tokenJson.token}`
      );
      return this.http.delete<any>(
        `${this.deleteUrl}${userId}/bookings/my-tours/${bookingId}`,
        { headers }
      );
    }
    return  of([]);
  }

  getMyTours(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}my-tours`);
  }

  getUserBookings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
