import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from "../../appSettings";
import { AuthServiceProvider } from "../auth-service/auth-service";

@Injectable()
export class RestServiceProvider {

  constructor(public http: Http, private authService: AuthServiceProvider) {
  }

  putData(url, objRequest) {
    return new Promise((resolve, reject) => {
      this.http.post(AppSettings.API_ENDPOINT + url, objRequest, this.authService.getHeader())
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getData(url) {
    return new Promise((resolve, reject) => {
      this.http.get(AppSettings.API_ENDPOINT + url, this.authService.getHeader())
        .subscribe(res => {
          resolve(res.json())
        }, (err) => {
          reject(err);
        });
    });
  }

}
