import { Component,OnInit } from '@angular/core';
import { Tour } from 'src/app/model/tour';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  TopTours: Tour[] = [];
  path = "../../../assets/img/tours/";

  userEmail: string = '';

  constructor(private userservice: UserService, private TourService: TourService) {}

  ngOnInit(): void {
    this.userservice.user$.subscribe((email) => {
      this.userEmail = email;
    });
    this.TourService.getAllTours().subscribe(response => {
      this.TopTours = response.filter(tour => tour.ratingsAverage > 4.7);
      console.log(this.TopTours.length);
      // console.log(this.TopTours[8].ratingsAverage);
    });
  }
}
