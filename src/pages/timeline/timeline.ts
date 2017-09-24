import { Component } from '@angular/core';
import {
  IonicPage, NavController, ModalController, NavParams, FabContainer, PopoverController, ToastController} from 'ionic-angular';
import { SharetimelinePage } from "../sharetimeline/sharetimeline";
import { RestServiceProvider } from "../../providers/rest-service/rest-service";
import { PopoverBarHeaderComponent } from "../../components/popover-bar-header/popover-bar-header";
import { CommentsTimelineComponent } from "../../components/comments-timeline/comments-timeline";


@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  Timelines: any;
  parsingResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public popoverCtrl: PopoverController, private toastCtrl: ToastController,  public restService: RestServiceProvider) {
    this.getTimelines();
  }

  getTimelines(){
    let toast = this.toastCtrl.create({
      message: ' Loading feeds ...',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.restService.getData('api/v1/timelineGetAll')
      .then((result) => {
        this.Timelines = result;
        toast.dismiss();
      }, (err) => {
        console.log(err);
        toast.dismiss();
      });
  }

  showFormTimeline(fab: FabContainer) {
      fab.close();
      let timelineModal = this.modalCtrl.create(SharetimelinePage);
      timelineModal.onDidDismiss(data => {
        if(typeof data !== "undefined") {
          this.parsingResult = {};
          this.Timelines.unshift(data);
        }
      })
      timelineModal.present();
  }

  likeThis(timelineId) {
    alert(timelineId);
  }

  showComments(timelineId){
    let commentModal = this.modalCtrl.create(CommentsTimelineComponent, {timeline_id: timelineId});
    commentModal.present();
  }
  showSearch() {
    alert('Show the search');
  }

  presentPopover(events) {
    let popoverHeader = this.popoverCtrl.create(PopoverBarHeaderComponent);
    popoverHeader.present({
      ev: events
    });
  }

}
