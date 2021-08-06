import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _apiService: ServiceService, private router: Router) { }

  submitted = false;
  ngOnInit(): void {
  }
  login = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  get loginFormControl() {
    return this.login.controls;
  }
  loginUser() {
    this.submitted = true;

    if (this.login.valid) {
      console.log(this.login.value);

      // let params = new HttpParams()

      let params = this.login.value
      console.log("login details", params);

      this._apiService.loginUser(params)
        .subscribe(
          result => {
            console.log("result is", result);

            if (result["status"] == false) {
              swal(result["message"]);
            }
            else {

              localStorage.setItem('loggedIn', 'TRUE')

              let data = result["data"]; 
              let token = data["token"];

              console.log("Token =", token);

              localStorage.setItem('token', token)

              this.showSuccessAlert()
            }
          },
          error => {
            console.log('error', error)
          }
        )
    }
  }

  showSuccessAlert() {
    swal({
      title: "Done",
      text: "Login successfully",
      icon: "warning",
      dangerMode: true,
    })
      .then(okClick => {
        if (okClick) {
          this.router.navigate(['auth/Home/'])
        }
      });
  }
}
