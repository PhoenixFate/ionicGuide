import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm} from "@angular/forms"
import { Http } from '@angular/http';
import { RegisterSuccessPage } from '../register-success/register-success';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  toRegister(form:NgForm){
    let url = "https://njrzzk.com/app/a/app/tblRegistrar/register?username="+form.value.username+"&&password="+form.value.password +"&&nickname="+form.value.nickname;
    this.http.get(url).subscribe(data => {
      console.log(data);
      console.log(data['_body']);
      let temp=JSON.parse(data['_body']);
      console.log(temp);
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
      let url = "https://njrzzk.com/app/a/app/tblRegistrar/checkUserNameAndPass?username="+this.username;
      this.http.get(url).subscribe(data => {
        let temp=JSON.parse(data['_body']);
        console.log(temp);
        if(temp.code==0){
          this.usernameUsed=false;
        }else {
          this.usernameUsed=true;
        }
      });
    }
  }
}
