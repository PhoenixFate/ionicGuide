import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  public title="";
  public typeTxt: string = "";
  public textareaValue="";
  public typeDataArr=[{'id':'1','type':'举报'},{'id':'2','type':'监督'},{'id':'3','type':'设备故障反馈'},{'id':'4','type':'软件建议'}]
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public toastCtrl:ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  makeSure(form:NgForm) {
    // console.log(form.value.title);
    // console.log(form.value.typeTxt);
    // console.log(form.value.textareaValue);
    const toast=this.toastCtrl.create({
      message:'感谢您的反馈',
      duration:1000,
      position:'middle'
    })
    toast.present();
    setTimeout(()=>{
      this.navCtrl.pop();
    },1200)
    
  }

  /*选择select的value*/
  switchType() {
    console.log(this.typeTxt);
  }
}
