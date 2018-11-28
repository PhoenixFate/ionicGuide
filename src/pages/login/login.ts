import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,} from 'ionic-angular';
import { NgForm } from "@angular/forms"
import { RegisterPage } from '../register/register'
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
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
  public username='';
  public password='';
  public remember=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public toastCtrl:ToastController,
    public httpServiceProvider:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
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
    let userTemp={username:form.value.username,password:form.value.password,remember:form.value.remember};
    this.storage.set('userTemp',userTemp);
    //请求获得用户数据
    this.httpServiceProvider.httpGet("tblRegistrar/login?username="+form.value.username+"&&password="+form.value.password,(data)=>{
      let temp=JSON.parse(data);
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

}
