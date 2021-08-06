import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private _apiService: ServiceService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
  userId: any;
  submitted = false;
  userProfileData: any;


  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
        this.getUserDetails(this.userId);
      });
  }

  userProfile = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    phone_no: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required)
  })

  get profileFormControl() {
    return this.userProfile.controls;
  }

  getUserDetails(userId: any) {
    const userToken = localStorage.getItem('token');
    this._apiService.getUserDetails(userToken, userId)
      .subscribe(
        result => {
          this.userProfile.patchValue({
            firstname: result.data.firstname,
            lastname: result.data.lastname,
            email: result.data.email,
            password: result.data.password,
            confirmpassword: result.data.password,
            phone_no: result.data.phone_no,
            age: result.data.age,
          });
        },
        error => {
          console.log('error', error);
        }
      )
  }

  putUserDetails() {
    this.submitted = true;
    if (this.userProfile.valid) {
      this.userProfileData = this.userProfile.value;
      console.log("userProfileData is", this.userProfileData);
      const ApiUrl = 'http://localhost:3033/update_user_byId/' + this.userId;
      this._apiService.putApi(ApiUrl, this.userProfileData)
        .subscribe(
          result => {
            console.log("result data", result);
            this.router.navigate(['auth/Home'])
          }
        )
    }
  }
}
