import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-success',
  templateUrl: 'register-success.html',
})
export class RegisterSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterSuccessPage');
  }

  ionViewDidEnter(){
    const toast=this.toastCtrl.create({
      message:"恭喜你注册成功!",
      duration:1600,
      position:'middle'
    })
    toast.present();
    setTimeout(()=>{
      this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    },2000)
  }

}
