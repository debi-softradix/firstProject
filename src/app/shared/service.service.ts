import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }

  registerUser(data: any) {
    let url = "http://localhost:3033/add";
    return this._http.post<any>(url, data)
  }

  loginUser(data: any) {
    let url1 = "http://localhost:3033/login";
    return this._http.post<any>(url1, data);
  }

  getAllUsers(token: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', token);
    let url = "http://localhost:3033/user_list";
    return this._http.get<any>(url, { headers: headers });
  }

  getUserDetails(token: any, id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorization', token);
    let url = "http://localhost:3033/get_user_byId/" + id;
    return this._http.get<any>(url, { headers: headers });
  }

  putApi(url: string, data: string) {
    return this._http.put<any>(url, data)
  }
  deleteApi(url: string){
    return this._http.delete<any>(url)

  }
}
