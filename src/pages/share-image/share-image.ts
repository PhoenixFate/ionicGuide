import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ShareImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-image',
  templateUrl: 'share-image.html',
})
export class ShareImagePage {
  public imgUrl='';
  public index=0;
  public callback;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgUrl=navParams.get('imgUrl');
    this.index=navParams.get('index');
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShareImagePage');
  }

  deleteImg(){
   this.callback(this.index).then(()=>{
    this.navCtrl.pop();
   });
  }
}
