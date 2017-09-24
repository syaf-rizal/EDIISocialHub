import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { AppSettings } from "../../appSettings";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private obj: any;
  private authUser: any;
  private attrUser: any;
  splash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public authService: AuthServiceProvider) {
    this.obj = {};
    this.obj.email = '';
    this.obj.password = '';
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false
    }, 4000);
  }

  userAuth(){
    const authCredential = {
      grant_type: 'password',
      client_id: AppSettings.clientId,
      client_secret: AppSettings.clientSecret,
      username: this.obj.email,
      password: this.obj.password,
      scope: '*'
    }
    this.authService.oAuthenticationService(authCredential).then((result) => {
      this.authUser = result;
      window.localStorage.setItem('schSess', JSON.stringify(this.authUser));

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.http.get(AppSettings.API_ENDPOINT + 'api/user', this.authService.getHeader())
        .subscribe(data => {
          this.attrUser = data.json();
          this.authUser.social      = btoa(this.authUser.id);
          this.authUser.email       = this.attrUser.email;
          this.authUser.name        = this.attrUser.name;
          this.authUser.last_name   = this.attrUser.last_name;
          this.authUser.avatar      = this.attrUser.avatar;
          this.authUser.activated   = (this.attrUser.activated === 1 ? true : false);
          window.localStorage.setItem('schSess', JSON.stringify(this.authUser));
          this.navCtrl.push("HomePage");
        });

      loading.dismiss();
    }, (err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'User Credential',
        message: 'Email or password incorret. Try log in again',
        buttons: ['Close']
      });
      alert.present();
    })
  }

  googlePlusAuth() {
    alert('Next Chapter');
  }

  facebookAuth() {
    alert('Next Chapter');
  }

}
