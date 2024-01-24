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
<<<<<<< HEAD
      console.log(response[8].slug);
=======
      // console.log(response[8].slug);
>>>>>>> 5941793928ff06d777ae1db7f5735a0384602022
    });
  }
}
