import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {  HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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

    debugger
    let headers = new HttpHeaders();
    headers = headers.append('token', token);

    let url = "http://localhost:3030/user_list";
    return this._http.post<any>(url,{headers:headers});
  }

}
