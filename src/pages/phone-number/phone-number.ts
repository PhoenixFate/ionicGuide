import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
})
export class PhoneNumberPage {
  public phoneNumber;
  public callback;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.callback = this.navParams.get("callback");
    this.phoneNumber = this.navParams.get("phoneNumber");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneNumberPage');
  }

  makeSure() {
    this.callback({type:3,value:this.phoneNumber}).then(() => {
      this.navCtrl.pop();
    });
    
  }
}
