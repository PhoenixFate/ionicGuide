import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { NicknamePage } from '../nickname/nickname'
import { PhoneNumberPage } from '../phone-number/phone-number';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public items = [
    {name:'头像',content:'assets/imgs/advance-card-jp.jpg'},
    {name:'用户名',content:'woody'},
    {name:'性别',content:'男'},
    {name:'绑定手机',content:'18751801512'}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changeProfile(index){
    if(index==0){
      this.changeAvatar();
    }else if(index==1){
      this.navCtrl.push(NicknamePage);
    }else if(index==2){
      this.changeSex();
    }else if(index==3){
      this.navCtrl.push(PhoneNumberPage);
    }
    
  }

  changeAvatar(){
    const actionSheet=this.actionSheetCtrl.create({
      buttons:[
        {
          text:'拍照'
        },
        {
          text:'从手机相册选择'
        },
        {
          text:'取消',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  changeSex(){
    const actionSheet=this.actionSheetCtrl.create({
      buttons:[
        {
          text:'男'
        },
        {
          text:'女'
        },
        {
          text:'取消',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  exit(){
    this.navCtrl.pop();
  }

}
