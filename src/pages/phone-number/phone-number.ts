import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
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
  public user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public http: Http,public toastCtrl:ToastController) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PhoneNumberPage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value != null) {
        this.user = value;
        this.phoneNumber = value.phone;
      }
    })
  }

  makeSure(form:NgForm) {
    if(/^1[0-9]{10}$/.test(form.value.phoneNumber)){
      let url = "https://njrzzk.com/app/a/app/tblRegistrar/update?id="+this.user.id+"&&phone="+form.value.phoneNumber;
      this.http.get(url).subscribe(data => {
        let temp=JSON.parse(data['_body']);
        let msg;
        if(temp.code==0){
          msg='修改成功';
          this.storage.set('user', temp.rows);
          setTimeout(()=>{
            this.navCtrl.pop();
          },1100)
        }else {
          msg=temp.msg;
        }
        const toast=this.toastCtrl.create({
          message:msg,
          duration:1000,
          position:'top'
        })
        toast.present();
      });
    }else {
      const toast=this.toastCtrl.create({
        message:'请输入11位有效的手机号码 ',
        duration:1600,
        position:'top'
      })
      toast.present();
    }
   
  }


}
