import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about-application',
  templateUrl: 'about-application.html',
})
export class AboutApplicationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  closeAbout() {
    this.viewCtrl.dismiss();
  }
}
