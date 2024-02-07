import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

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

  constructor(private uservice: UserService, private router:Router)
  {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.isMenuOpen);
  }
  ngOnInit(): void {
    this.uservice.isloggedIn.subscribe(loggedIn => {
      this.isloggedIn = loggedIn;
      if (loggedIn)
      {
        this.uservice.getCurrentUser().subscribe(user => {
          this.username = user.name;
        });
      }
    });
  }

  logout() {
    this.uservice.logout();
    this.router.navigate(['/']);
}
}
