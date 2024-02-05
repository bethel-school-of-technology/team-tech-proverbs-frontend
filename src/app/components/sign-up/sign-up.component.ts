import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let errorHandled = false;

    const handleRegistrationError = (error: any) => {
      if (!errorHandled) {
        // Extract the error message using the handleError method
        // this.errorMessage = this.userService.handleHttpError(error);
        this.errorMessage = this.userService.handleHttpError({
          message: error,
        });
        // console.log(error);
        window.alert(this.errorMessage);
        errorHandled = true;
      }
    };

    this.userService.register(this.user).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['/tours']);
        } else {
          handleRegistrationError(response);
        }
      },
      (error) => {
        handleRegistrationError(error);
      }
    );
  }
}
