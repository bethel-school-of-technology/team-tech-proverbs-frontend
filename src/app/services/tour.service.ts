import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  Url = "http://127.0.0.1:3004/api/v1/tours";

  constructor(private http: HttpClient) { }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.Url);
  }
  
  // getAllTours(): Observable<Tour[]> {
  //   return this.http.get<any>(this.Url)
  //     .pipe(
  //       map(response => {
  //         // Assuming the 'data' property contains the array of tours
  //         const tours = response.data ? response.data.data : [];
          
  //         // Assuming your Tour model has properties like startLocation, ratingsAverage, etc.
  //         return tours.map((tourData: any) => new Tour(tourData));
  //       })
  //     );
  // }
}
