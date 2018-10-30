import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms"
/**
 * Generated class for the UsernamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-username',
  templateUrl: 'username.html',
})
export class UsernamePage {
  public username;
  public user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UsernamePage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value != null) {
        this.user = value;
        this.username = value.username;
      }
    })
  }

  makeSure(form:NgForm) {
    console.log("aa")
    console.log(form.value);
  }

}
