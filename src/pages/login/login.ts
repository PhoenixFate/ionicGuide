import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar, App } from 'ionic-angular';
import { NgForm } from "@angular/forms"
import { RegisterPage } from '../register/register'
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //@ViewChild(Navbar) navBar: Navbar;

  public username='';
  public password='';
  public remember=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http, private storage: Storage,public toastCtrl:ToastController,public app:App) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
    //this.navBar.backButtonClick = this.backButtonClick;
  }

  ionViewDidEnter(){
    this.storage.get('userTemp').then((value)=>{
      if(value!=null){
        this.username=value.username;
        this.remember=value.remember;
        if(value.remember){
          this.password=value.password;
        }
      }
    })
  }

  onLogin(form:NgForm){
    //console.log(form.value);
    let userTemp={username:form.value.username,password:form.value.password,remember:form.value.remember};
    this.storage.set('userTemp',userTemp);
    let url = "https://njrzzk.com/app/a/app/tblRegistrar/login?username="+form.value.username+"&&password="+form.value.password;
    this.http.get(url).subscribe(data => {
      let temp=JSON.parse(data['_body']);
      if(temp.code!==0){
        const toast=this.toastCtrl.create({
          message:temp.msg,
          duration:1300,
          position:'top'
        })
        toast.present();
      }else {
        this.storage.set('user', temp.rows);
        this.navCtrl.popToRoot();
      }
    });
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }

  backButtonClick(){
    this.app.getRootNav().push('tab4Root');
  }
}
