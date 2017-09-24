import { Component, ViewChild } from '@angular/core';
import { ModalController, ViewController, AlertController, NavController, App } from "ionic-angular";
import { AboutApplicationPage } from "../../pages/about-application/about-application";

@Component({
  selector: 'popover-bar-header',
  templateUrl: 'popover-bar-header.html'
})
export class PopoverBarHeaderComponent {
  @ViewChild('schNav') nav: NavController;

  constructor(private mdlCtrl: ModalController, private viewCtrl: ViewController, private alertCtrl: AlertController, public appCtrl: App) {}

  aboutApplication() {
    let aboutPage = this.mdlCtrl.create(AboutApplicationPage);
    aboutPage.present();
    this.viewCtrl.dismiss();
  }

  logoutDestroyStorage() {
    let alert = this.alertCtrl.create({
      title: 'Exit',
      message: 'Sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            localStorage.removeItem('schSess');
            this.appCtrl.getRootNav().push("LoginPage");
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
}
