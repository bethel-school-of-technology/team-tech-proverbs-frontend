import { Component,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalProject';
  isMenuOpen = false;
  loggedIn: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // console.log(this.isMenuOpen);
  }

}
