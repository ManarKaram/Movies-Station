import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.services';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // end point of register api
  RegisterApiEndPoint = "https://e-commerce-web-application2020.herokuapp.com/users/register";

  // form variable
  registrationForm: FormGroup;

  // boolean flag for api request
  loading = false;

  // boolean flag for api error
  apiError = false;

  constructor(private formBuilder: FormBuilder,
    private http: QueryService,
    public validation: ValidationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  // method to build the form
  createForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.validation.alphaPattern), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.validation.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validation.passwordPattern)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.validation.passwordPattern)]]
    })
  }

  // method to get form data
  submitForm() {

    // open loading , send api request and subscribe to it 
    this.loading = true;
    const data = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this.http.postReq(this.RegisterApiEndPoint, data).subscribe(
      (res) => {

        this.successCallBack();

      },
      (err) => {
        console.log(err)

        // this api had some issues to solve later
        if (err.status === 200) {
          this.successCallBack()
        } else {
          // stop loading
          this.loading = false;

          //reset the form and open the boolean flag for a while
          this.registrationForm.reset();
          this.apiError = true;
          setTimeout(() => {
            this.apiError = false;
          }, 5000)

        }
      }


    )
  }

  successCallBack() {
    // store user name in local storage
    let userEmail = this.registrationForm.value.email;
    let userName = this.registrationForm.value.name;
    let userData = {
      name: userName
    }
    localStorage.setItem(userEmail, JSON.stringify(userData));


    // stop loading and navigate to login page
    this.loading = false;
    this.router.navigate(['/login']);
  }

}
