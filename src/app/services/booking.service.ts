import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://127.0.0.1:3004/api/v1/bookings/';

  constructor(private http: HttpClient) {}

  createCheckoutSession(tourId: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:3004/api/v1/bookings/checkout-session/${tourId}`);
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

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${bookingId}`);
  }

  getMyTours(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}my-tours`);
  }

  getUserBookings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
