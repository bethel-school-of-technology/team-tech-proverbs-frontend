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
  username? = '';
  jwtString = localStorage.getItem('jwt');
  currentUser: any;

  constructor(private uservice: UserService, private router:Router){}

  toggleMenu() {
    const token = localStorage.getItem('currentUser');
    if(token) {
      this.isloggedIn = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.isMenuOpen);
  }
  ngOnInit(): void {
    
    if(this.jwtString !== null) {
      const response = JSON.parse(this.jwtString);
      this.currentUser = response.data.user;
      // console.log(this.currentUser);
    }

    this.uservice.isloggedIn.subscribe(loggedIn => {
      this.isloggedIn = loggedIn;
      if (loggedIn)
      {
        this.uservice.getCurrentUser().subscribe(user => {
          this.username = user.name;
          console.log(this.username);
        });
      }
    });
  }

  logout() {
    this.uservice.logout();
    this.router.navigate(['/']);
}
}
