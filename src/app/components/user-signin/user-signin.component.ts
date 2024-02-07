import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent {

   email: string = "";
   password: string = "";
 errorMessage: string = '';
 constructor(private userservice : UserService, private router: Router)
 {}
 onSubmit(){
  this.userservice.login(this.email,this.password).subscribe(
    (response) => 
    {
      console.log('logged in successfully', response);
      this.userservice.setUserEmail(response.data.user.email);
      this.router.navigate(['/home']);
    },
    (error) => {
      console.error('Logged in Fail', error);
      
      if (error.status === 401) {
        this.errorMessage = 'An unexpected error occurred.';
      } else {
        this.errorMessage = 'Signin failed. Wrong password. Try to Login Again';
        
      }
    }
  );
  
 }
}
