import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  submitUserData() {
    throw new Error('Method not implemented.');
  }
  onPhotoChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  submitPassword() {
    throw new Error('Method not implemented.');
  }
  activeNavItem: any;
  user: any;

  isloggedIn: boolean = false;
  currentUser: any;
  constructor (private uservice: UserService) {}

  ngOnInit(): void {
    this.uservice.isloggedIn.subscribe(loggedIn => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        const jwtString = localStorage.getItem('jwt');
        if (jwtString !== null) {
          const response = JSON.parse(jwtString);
          this.currentUser = response.data.user;
        } else {
          this.currentUser;
        }
      }
    });
  }
}
