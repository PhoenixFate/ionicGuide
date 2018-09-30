import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NicknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nickname',
  templateUrl: 'nickname.html',
})
export class NicknamePage {
  public nickname;
  public callback;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.callback = this.navParams.get("callback");
    this.nickname=this.navParams.get("nickname");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NicknamePage');
  }

  makeSure(){
    this.callback({type:1,value:this.nickname}).then(() => {
      this.navCtrl.pop();
    });
  }
}
