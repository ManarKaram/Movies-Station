import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.services';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // end point of register api
  LoginApiEndPoint = "https://e-commerce-web-application2020.herokuapp.com/users/login";

  // form variable
  loginForm: FormGroup;

  // boolean flag for api request
  loading = false;

  // boolean flag for api error
  apiError = false;
  constructor(private formBuilder: FormBuilder,
    private http: QueryService,
    public validation: ValidationService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  // method to build the form
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.validation.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validation.passwordPattern)]]
    })
  }

  // method to submit form
  submitForm() {
    // open loading , send api request and subscribe to it 
    this.loading = true;
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.http.postReq(this.LoginApiEndPoint, data).subscribe(
      (res) => {

        // retrieve user data from local storage and update it
        let userEmail = this.loginForm.value.email;
        let userData = JSON.parse(localStorage.getItem(userEmail))
        userData.token = res.token;
        localStorage.setItem(userEmail, JSON.stringify(userData));

        // save online user
        localStorage.setItem('onlineUser', userEmail);
        // stop loading and navigate to login page
        this.loading = false;
        this.router.navigate(['/home']);

      },
      (err) => {

        // stop loading
        this.loading = false;

        //reset the form and open the boolean flag for a while
        this.loginForm.reset();
        this.apiError = true;
        setTimeout(() => {
          this.apiError = false;
        }, 3000)

      }
    )
  }

}
