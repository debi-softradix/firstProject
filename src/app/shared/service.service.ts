import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {  HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  token:string = ""

  constructor(private _http:HttpClient) { }

  registerUser(data:any) {
    
    let url = "http://localhost:3030/add";
    return this._http.post<any>(url,data)
  }

  loginUser(data:any) {

    let url1 = "http://localhost:3030/login";
    return this._http.post<any>(url1,data); 
  }

  getAllUsers(token:string) { 

    this.token = token

    let headers = new HttpHeaders();
    headers = headers.append('authorization', this.token);

    let url = "http://localhost:3030/user_list/"; 
    return this._http.get<any>(url,{headers:headers});
  }

  getUserDetails(userId:string) {
    
    let headers = new HttpHeaders();
    headers = headers.append('authorization', this.token);

    let params = new HttpParams()
    .set('id', userId);
    
    let url = "http://localhost:3030/get_user_byId";
    return this._http.get<any>(url,{headers:headers,params:params});
  }

}
