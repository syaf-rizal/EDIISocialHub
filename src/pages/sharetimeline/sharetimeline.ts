import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { RestServiceProvider } from "../../providers/rest-service/rest-service";

@IonicPage()
@Component({
  selector: 'page-sharetimeline',
  templateUrl: 'sharetimeline.html',
})
export class SharetimelinePage {

  private obj: any;
  private responseShare: any;
  private imagePreview: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toastCtrl: ToastController, private alertCtrl: AlertController, private camera: Camera, private restService: RestServiceProvider) {
    let sessionAuth = JSON.parse(localStorage.getItem('schSess'));
    this.obj = {};
    this.obj.timelines_story = '';
    this.obj.timelines_avatar = sessionAuth.avatar;
    this.obj.timelines_user_name = sessionAuth.name + ' ' + (sessionAuth.last_name === null ? '' : sessionAuth.last_name);
  }

  closeTimeline() {
    this.viewCtrl.dismiss();
  }

  shareTimeline() {
    let toast = this.toastCtrl.create({
      message: ' Uploading ... ',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    if(this.imagePreview != null)
    {
      this.obj.timelines_photo = this.imagePreview;
    }
    this.responseShare = {};
    this.restService.putData('api/v1/timelinePut', this.obj).then((result) => {
      this.responseShare = result;
      toast.onDidDismiss(() => {
        this.viewCtrl.dismiss(this.responseShare.callback_data);
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

  sharePhoto() {
    const options : CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageAttr) => {
      this.imagePreview = "data:image/jpeg;base64," + imageAttr;
    }, (err) => {
      console.log(err);
    });
  }

}
