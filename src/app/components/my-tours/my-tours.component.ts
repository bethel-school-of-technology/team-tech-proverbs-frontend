import { Component } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { Tour } from 'src/app/model/tour';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-tours',
  templateUrl: './my-tours.component.html',
  styleUrls: ['./my-tours.component.css'],
})
export class MyToursComponent {
  TourList: any[] = [];
  currentUser: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // const token = localStorage.getItem('jwt');
    // if (token) {
    //   const tokenNonString = JSON.parse(token);
    //   this.currentUser = tokenNonString.data.user;
    // }

    // console.log(this.currentUser._id);
    this.userService.getMyTours().subscribe((response) => {
      this.TourList = response;
      console.log(response);
    });
  }
}
