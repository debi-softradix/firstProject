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

    let headers = new HttpHeaders();
    headers = headers.append('authorization', token);

    let url = "http://localhost:3030/user_list";
    return this._http.get<any>(url,{headers:headers});
  }

  getEditUsers(){
    let url = "http://localhost:3030/get_user_byId/:5";
    return this._http.get<any>(url);
  }

}
