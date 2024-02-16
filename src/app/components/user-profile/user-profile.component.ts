import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  submitPassword() {
    throw new Error('Method not implemented.');
  }
  activeNavItem: any;
  user: any;

  isloggedIn: boolean = false;
  currentUser: any = {};
  constructor(private uservice: UserService, private route: Router) {}

  ngOnInit(): void {
    this.uservice.isloggedIn.subscribe((loggedIn) => {
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

  submitUserData(user: User): void {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (user.photo && typeof user.photo !== 'string') {
      formData.append('photo', user.photo, user.photo.name); // Append the File object directly
    }
    +

    this.uservice.updateUserData(formData).subscribe((response) => {
      this.currentUser = response.data.user;
      this.resetToken(this.currentUser);
      window.location.reload();
    });
  }

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    this.currentUser.photo = file;
  }

  resetToken(user: any) {
    const jwtString = localStorage.getItem('jwt');
    if (jwtString !== null) {
      const response = JSON.parse(jwtString);
      response.data.user = this.currentUser;
      // alert("Updated Successful to:" + response.data.user.name);
      localStorage.removeItem('jwt');
      localStorage.setItem('jwt', JSON.stringify(response));
    } else {
      alert('user is not available');
    }
  }
}
