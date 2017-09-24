import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { TimelinePage } from "../timeline/timeline";
import { ApplicationsPage } from "../applications/applications";
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabTimeline = TimelinePage;
  tabApplications = ApplicationsPage;
  tabMessages = MessagesPage;
  tabProfile = ProfilePage;

  constructor(public navCtrl: NavController) {

  }

}
