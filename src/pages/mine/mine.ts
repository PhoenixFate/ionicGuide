import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DistancePage } from '../distance/distance';
import { VersionPage } from '../version/version';
import { FeedbackPage } from '../feedback/feedback';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }

  items = [
    {name:'语言播报距离',icon:'megaphone'},
    {name:'个人资料',icon:'paper'},
    {name:'查看版本',icon:'more'},
    {name:'反馈',icon:'heart'}
  ];

  toDetails(index){
    if(index==0){
      this.navCtrl.push(DistancePage);
    }
    else if(index==1){
      this.navCtrl.push(ProfilePage);
    }
    else if(index==2){
      this.navCtrl.push(VersionPage);
    }
    else if(index==3){
      this.navCtrl.push(FeedbackPage);
    }
  }
}
