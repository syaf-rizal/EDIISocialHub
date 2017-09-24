import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from "../../appSettings";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {}


  oAuthenticationService(objAuthentication) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(AppSettings.API_ENDPOINT + 'oauth/token', objAuthentication, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getHeader(){
    let headers = new Headers();
    const tokenData = JSON.parse(window.localStorage.getItem('schSess'));
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + tokenData.access_token);
    return new RequestOptions({headers: headers});
  }




}
