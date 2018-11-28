import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public toastCtrl:ToastController,
    public httpServiceProvider:HttpServiceProvider) {
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
    //请求获得轮播图数据
    this.httpServiceProvider.httpGet("tblRegistrar/update?id="+this.user.id+"&&nickname="+form.value.nickname,(data)=>{
      let temp=JSON.parse(data);
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
