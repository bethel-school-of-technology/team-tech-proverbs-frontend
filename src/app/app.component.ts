import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FinalProject';
  isMenuOpen = false;
  isloggedIn: boolean = false;
  currentUser: any;

  constructor(private uservice: UserService, private router:Router){}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.isMenuOpen);
  }
  ngOnInit(): void {

    this.uservice.isloggedIn.subscribe(loggedIn => {
      this.isloggedIn = loggedIn;
      if(loggedIn) {
        const jwtString = localStorage.getItem('jwt');
        if(jwtString !== null) {
            const response = JSON.parse(jwtString);
            this.currentUser = response.data.user;
          } else {
            this.currentUser;
          }
      }
    });
  }

  logout() {
    this.uservice.logout();
    this.router.navigate(['/']);
  }
}
