import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) { }

  createCheckoutSession(tourId: string) {
    return this.http.get<any>(`/api/v1/bookings/checkout-session/${tourId}`);
  }
}
