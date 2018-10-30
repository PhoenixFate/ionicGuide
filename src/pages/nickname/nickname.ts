import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
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
  public user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,public http: Http,public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NicknamePage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value != null) {
        this.user = value;
        this.nickname = value.nickname;
      }
    })
  }

  makeSure(form:NgForm) {
    let id=this.user.id;
    let url = "https://njrzzk.com/app/a/app/tblRegistrar/update?id="+this.user.id+"&&nickname="+form.value.nickname;
    this.http.get(url).subscribe(data => {
      let temp=JSON.parse(data['_body']);
      if(temp.code==0){
        const toast=this.toastCtrl.create({
          message:"修改成功",
          duration:1000,
          position:'top'
        })
        toast.present();
        this.storage.set('user', temp.rows);
        setTimeout(()=>{
          this.navCtrl.pop();
        },1100)
      }else {
        const toast=this.toastCtrl.create({
          message:temp.msg,
          duration:1000,
          position:'top'
        })
        toast.present();
      }
    });
  }
}
