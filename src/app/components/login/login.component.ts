import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  get fields() {
    return this.loginForm.controls;
  }
  constructor(private authentificationService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(15)])
    });
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const psword = this.loginForm.value.password;

    this.authentificationService.login(email, psword).subscribe(
      (user: User) => {
        const isValid = this.authentificationService.validateAndPersist(user.token.token);
        console.log(isValid);
        if (isValid) {
          return this.router.navigate(['home']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
