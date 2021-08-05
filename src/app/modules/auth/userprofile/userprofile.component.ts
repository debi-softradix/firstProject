import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private _apiService: ServiceService) { }

  ngOnInit(): void {
  }
  // getEditUsers() {
  //   this._apiService.getEditUsers(this.getEditUsers)
  //     .subscribe(
  //       result => {
  //         console.log("response data", result);

  //       })
  // getEditUsers(){
  // this._apiService.(Id:any)
  //       .subscribe(
  //         result => {
  //           console.log("result is", result);
  //           if (result["status"] == true) {
              
  //             console.log("result",usersId);
  //           }
  //         },

  //         error => {
  //           console.log('error', error)
  //         }
  //       )
  
}

