import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private _apiService: ServiceService, private router: Router) { }

  submitted = false;
  isPasswordMatched: boolean = false;
  passwordErrorMsg = "";
  registrationData: any;
  registrationForm: any;
  isEmailAddressValid: boolean = false;
  emailErrorMsg = "";

  ngOnInit(): void {
  }

  registration = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    phone_no: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required)
  })

  get registrationFormControl() {
    return this.registration.controls;
  }

  onBlurPassword() {
    this.passwordErrorMsg = "password and confirm password did not match";
    if (this.registration.value.password !== this.registration.value.confirmpassword) {
      this.isPasswordMatched = false;
    }
    else {
      this.isPasswordMatched = true;
    }
    this.emailErrorMsg = "Email is invalid";
    if (this.registration.value.email !== this.registration.value) {
      this.isEmailAddressValid = false;
    }
    else {
      this.isEmailAddressValid = true;
    }
  }
  registerUser() {
    this.submitted = true;
    if (this.registration.valid) {
      this.registrationData = this.registration.value;
      delete this.registrationData["confirmpassword"]
      console.log("registration data is", this.registrationData)
      console.log(this.registration.value);

      this._apiService.registerUser(this.registrationData)
        .subscribe(
          result => {

            console.log("response data", result);
            if (result["status"] == false) {

              swal(result["message"]);
            }
            else {

              this.showSuccessAlert()
            }
          },
          error => {

          }
        )
    }
  }

  showSuccessAlert() {
    swal({
      title: "Done",
      text: "User added successfully",
      // icon: "warning",
      dangerMode: true,
    })
      .then(okClick => {
        if (okClick) {
          this.router.navigate(['auth/Login/'])
        }
      });
  }
}
