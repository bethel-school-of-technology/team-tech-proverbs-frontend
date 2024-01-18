import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent {

 credentials = {
  email:'',
  password: ''
 }

 constructor(private userservice : UserService, private router: Router)
 {}
 onSubmit(){
  this.userservice.login(this.credentials).subscribe(
    (response) => 
    {
      console.log('logged in successfully', response);
      this.userservice.setUserEmail(response.data.user.email);
      this.router.navigate(['/home']);
    },
    (error) => {
      console.error('Logged in Fail', error);
    }
  );
 }
}
