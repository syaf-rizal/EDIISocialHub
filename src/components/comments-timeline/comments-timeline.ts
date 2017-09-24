import { Component } from '@angular/core';
import { NavParams, ViewController, ToastController, AlertController } from "ionic-angular";
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@Component({
  selector: 'comments-timeline',
  templateUrl: 'comments-timeline.html'
})
export class CommentsTimelineComponent {
  private obj: any;
  private responseComment: any;
  private timelineId: number;
  private comments: any;

  constructor(private params: NavParams, private viewCtrl: ViewController, private toastCtrl: ToastController, private alertCtrl: AlertController, private restService: RestServiceProvider) {
    let sessionAuth = JSON.parse(localStorage.getItem('schSess'));
    this.timelineId = this.params.get('timeline_id');
    this.obj = {};
    this.obj.sch_comments_timeline_id = this.timelineId;
    this.obj.sch_comments_avatar = sessionAuth.avatar;
    this.obj.sch_comments_user_name = sessionAuth.name + ' ' + (sessionAuth.last_name === null ? '' : sessionAuth.last_name);
    this.getComment();
  }

  closeComment() {
    this.viewCtrl.dismiss();
  }

  sendComment() {
    let toast = this.toastCtrl.create({
      message: ' Uploading ... ',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.responseComment= {};
    this.restService.putData('api/v1/commentTimelinePut', this.obj).then((result) => {
      this.responseComment = result;
      toast.onDidDismiss(() => {
        this.comments.push(this.responseComment.callback_data);
        this.obj.sch_comments_reply = null;
      });
    }, (err) => {
      console.log(err);
      toast.onDidDismiss(() => {
        let alert = this.alertCtrl.create({
          title: 'EDII Social Hub',
          message: 'An error occurred, please try again',
          buttons: ['Close']
        });
        alert.present();
      });
    })
  }

  getComment(){
    this.restService.getData('api/v1/getTimelineComment/' + this.timelineId )
      .then((result) => {
        this.comments = result;
      }, (err) => {
        console.log(err);
      });
  }

}
