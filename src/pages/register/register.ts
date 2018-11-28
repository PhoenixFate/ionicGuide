import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm} from "@angular/forms"
import { RegisterSuccessPage } from '../register-success/register-success';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public username=''
  public nickname=''
  public password=''
  public checkPassword="";
  public usernameUsed=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServiceProvider:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  toRegister(form:NgForm){
    //注册用户
    this.httpServiceProvider.httpGet("tblRegistrar/register?username="+form.value.username+"&&password="+form.value.password +"&&nickname="+form.value.nickname,(data)=>{
      let temp=JSON.parse(data);
      if(temp.code==0){
        this.navCtrl.push(RegisterSuccessPage);
      }else {
       
      }
    });
  }

  checkName(){
    if(this.username==''){
      this.usernameUsed=false;
      return;
    }else {
      //查询用户名是否可用
      this.httpServiceProvider.httpGet("tblRegistrar/checkUserNameAndPass?username="+this.username,(data)=>{
        let temp=JSON.parse(data);
        if(temp.code==0){
          this.usernameUsed=false;
        }else {
          this.usernameUsed=true;
        }
      });
    }
  }
}
