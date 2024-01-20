import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  user = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };
  errorMessage: string = '';
  constructor(private userservice :UserService, private router: Router){}

  
  ngOnInit(): void {
    
  }

  onSubmit() {
    this.userservice.register(this.user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/tours']); 
      },
      (error) => {
        console.error('Error registering user', error);

        if (error.status === 500 && error.error.message.includes('Password validation')) {
          this.errorMessage = 'An unexpected error occurred.';
        } else {
          this.errorMessage = 'Password must be at least 6 characters.';
        }
      }
    );
  }

}
