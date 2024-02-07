import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  TopTours: Tour[] = [];
  TourList: Tour[] = [];
  path = "../../../assets/img/tours/";

  userEmail: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private userservice: UserService,
    private TourService: TourService
  ) {}

  ngOnInit(): void {
    this.TourService.getAllTours().subscribe(response => {
      this.TourList = response;
      this.TopTours = response.filter(tour => tour.ratingsAverage > 4.7);
      // console.log(this.TourList[0].locations[0].description);
    });
  }
}
