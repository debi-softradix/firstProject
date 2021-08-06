import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _apiService: ServiceService, private activatedRoute: ActivatedRoute) { }

  usersArray: any;
  userId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.userId = params.get('id');
        // this.deleteUserDetails(this.userId);
      });

    this.getUsers();
  }

  logoutUser() {
    localStorage.removeItem("loggedIn")
    this.router.navigate(['auth/Login/'])
  }

  getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('token')!);
  }

  getUsers() {
    const userToken = localStorage.getItem('token');
    if (userToken !== null) {
      console.log("home token = ", userToken);

      this._apiService.getAllUsers(userToken)
        .subscribe(
          result => {
            console.log("result is", result);
            if (result["status"] == true) {
              this.usersArray = result["data"];
              console.log("usersArray =", this.usersArray);
            }
          },
          error => {
            console.log('error', error)
          }
        )
    }
  }
  editProfile(userId: any) {
    console.log("Id is", userId)
    this.router.navigate(['auth/Userprofile/' + userId])
  }

  deleteUserDetails(userId: any) {
    const ApiUrl = 'http://localhost:3033/delete_user_byId/' + userId;
    this._apiService.deleteApi(ApiUrl)
      .subscribe(
        result => {
          console.log("result data", result)
          this.router.navigate(['auth/Registration'])
        }

      )
  }
}
