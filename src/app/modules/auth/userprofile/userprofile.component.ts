import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private _apiService: ServiceService, private activatedRoute: ActivatedRoute) { }

  userId: string = "1";

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      //this.userId = params.get('id');
      console.log("edit user id is", params)
      this.getUserDetails(this.userId);
    });
  }

  getUserDetails(userId: any) {
    this._apiService.getUserDetails(userId)
      .subscribe(
        result => {
          console.log("result is", result);
        },
        error => {
          console.log('error', error);
        }
      )

  }

}

