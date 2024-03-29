import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-get-all-tours',
  templateUrl: './get-all-tours.component.html',
  styleUrls: ['./get-all-tours.component.css'],
})
export class GetAllToursComponent implements OnInit {
  TourList: Tour[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.getAllTours().subscribe((response) => {
      this.TourList = response;
    });
  }
}
