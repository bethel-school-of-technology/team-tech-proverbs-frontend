import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-tours',
  templateUrl: './my-tours.component.html',
  styleUrls: ['./my-tours.component.css'],
})
export class MyToursComponent {
  TourList: any[] = [];
  currentUser: any;

  constructor(private userService: UserService, private bookingService: BookingService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      const tokenNonString = JSON.parse(token);
      this.currentUser = tokenNonString.data.user;
    }

    this.userService.getMyTours(this.currentUser._id).subscribe((response) => {
      this.TourList = response;
    });
  }
  deleteBooking() {
    this.bookingService.deleteBooking(this.currentUser._id,this.TourList[0]._id).subscribe(response => {
      alert("tour has been Deleted");
    })
  }
}
