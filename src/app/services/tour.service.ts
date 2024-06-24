import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  Url = 'https://awesometours.org/api/v1/tours';

  constructor(private http: HttpClient) {}

  getAllTours(): Observable<Tour[]> {
    return this.http.get<any>(this.Url).pipe(
      map((response) => {
        // Assuming the 'data' property contains the array of tours
        const tours = response.data ? response.data.data : [];

        // Assuming your Tour model has properties like startLocation, ratingsAverage, etc.
        return tours.map((tourData: any) => new Tour(tourData));
      })
    );
  }
  getTourById(tourId: string): Observable<any> {
    const tourUrl = `${this.Url}/${tourId}`;
    return this.http.get<any>(tourUrl).pipe(
      map((response) => {
        // Assuming the 'data' property contains the array of tours
        const tours = response.data ? response.data.data : null;

        // Assuming your Tour model has properties like startLocation, ratingsAverage, etc.
        return tours? new Tour(tours) : null;
      })
    );
  }
  getTourBySlug(slug: string): Observable<any> {
    const url = `${this.Url}/tours/${slug}`; // Adjust the URL structure based on your API

    return this.http.get(url);
  }
}
