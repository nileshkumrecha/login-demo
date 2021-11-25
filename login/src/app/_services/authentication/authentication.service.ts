import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import * as decode from 'jwt-decode';
// import { Router } from "@angular/router";
// import { tap } from "rxjs/operators";

@Injectable()
export class AuthenticationService {

  public adminURL: string;
  private _tokenPayload;
  public _userId;

  constructor(public httpClient: HttpClient, private router: Router) {
    this.adminURL = environment.serverUrl;
   }

  // createUser(data): Observable<string> {
  //   console.log("INSIDE SERVICE");
  //   return of("User");
  //   // return this.httpClient.post(this.adminURL+'/auth/createUser',data);
  // }
  createUser(data) {
    console.log("URL",this.adminURL+'auth/signup');
    return this.httpClient.post(this.adminURL+'auth/signup',data);
  }

  resetPassword(data) {
    return this.httpClient.post(this.adminURL+'auth/reset-password',data);
  }

  forgotPassword(data) {
    return this.httpClient.post(this.adminURL+'auth/forget',data);
  }

  createNewPassword(data) {
    return this.httpClient.post(this.adminURL+'auth/createnewpassword',data);
  }

  checkCredentials(body): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				"Access-Control-Allow-Origin": "*",
				'Content-Type': 'application/json',
				"Access-Control-Allow-Credentials": "true",
				// 'Authorization': this.token
			})
		};
		const url = `${this.adminURL}/auth/login`;
		return this.httpClient.post(url, body, httpOptions)
	}


  getToken(): string {
    return localStorage.getItem('Token');
  }

  setToken(token: string): void {
    this.decodeToken();
    localStorage.setItem('Token', token);
  }

  decodeToken() {
    if(!this._tokenPayload) {
      const token = localStorage.getItem('Token');
      if(token) {
        const payload = decode(token);
        if(payload) {
          this._tokenPayload =  payload;
          this._userId = payload.userId;
        }
        console.log(payload);
        return payload;
      }
    }
  }

  deleteToken() {
    localStorage.removeItem('Token');
    this._tokenPayload = null;
  }

  public get uniqueId(): any {
    this.decodeToken();
    return this._userId;
  }

}
