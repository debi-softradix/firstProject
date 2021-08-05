import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _apiService: ServiceService) { }

  ngOnInit(): void {

    this.getUsers()
  }

  logoutUser() {
    localStorage.removeItem("loggedIn")
    this.router.navigate(['auth/Login/'])
  }

  getTokenFromLocalStorage() {

    return JSON.parse(localStorage.getItem('token')!);
  }

  getUsers() {

    debugger
    const userToken = localStorage.getItem('token');
    if (userToken !== null) {

      console.log("home token = ", userToken);

      this._apiService.getAllUsers(userToken)
      .subscribe(
        result => {
          console.log("result is", result);

          if (result["status"] == true) {

          }
        },
        error => {
          console.log('error', error)
        }
      )
    }


    
  }

}
