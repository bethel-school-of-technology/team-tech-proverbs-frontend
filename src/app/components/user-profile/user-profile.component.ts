import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

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
  currentUser: User = new User();
activeNavItem: any;
user: any;
  ngOnInit(): void {
  }
}
