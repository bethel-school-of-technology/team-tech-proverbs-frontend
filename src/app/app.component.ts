import { Component,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalProject';
  isMenuOpen = false;
  isLoggedIn: boolean = false;
  

  toggleMenu() {
    const token = localStorage.getItem('currentUser');
    if(token) {
      this.isLoggedIn = true;
    }
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.isMenuOpen);
  }

}
