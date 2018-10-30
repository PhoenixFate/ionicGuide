import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
/**
 * Generated class for the DistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distance',
  templateUrl: 'distance.html',
})
export class DistancePage {
  public speakDistance;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public toastCtrl: ToastController) {
    this.storage.get('speakDistance').then((value) => {
      this.speakDistance = value;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistancePage');
  }

  makeSure(form: NgForm) {
    if (/^[1-9]\d*$/.test(form.value.speakDistance)) {
      this.storage.set('speakDistance', this.speakDistance);
      this.navCtrl.pop();  
    } else {
      const toast = this.toastCtrl.create({
        message: '请输入一个大于零的正整数',
        duration: 1600,
        position: 'top'
      })
      toast.present();
    }
  }
}
