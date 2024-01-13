import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  Url = "http://127.0.0.1:3004/";

  constructor(private http: HttpClient) { }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.Url);
  }
}
