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
  public items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl:ActionSheetController) {
    console.log("profile");
    this.items=[
      {name:'头像',content:'assets/imgs/advance-card-jp.jpg'},
      {name:'用户名',content:'woody'},
      {name:'性别',content:'男'},
      {name:'绑定手机',content:'18751801512'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changeProfile(index){
    var that=this;
    if(index==0){
      this.changeAvatar();
    }else if(index==1){
      this.navCtrl.push(NicknamePage, {
        nickname:this.items[1].content,
        callback: this.myCallbackFunction
     });
    }else if(index==2){
      this.changeSex();
    }else if(index==3){
      this.navCtrl.push(PhoneNumberPage, {
        phoneNumber:this.items[3].content,
        callback: this.myCallbackFunction
     });
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
    var that=this;
    const actionSheet=this.actionSheetCtrl.create({
      buttons:[
        {
          text:'男',
          handler:()=>{
            that.items[2].content='男';
          }
        },
        {
          text:'女',
          handler:()=>{
            that.items[2].content='女';
          }
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


  // 用于pop 回调的 block
  myCallbackFunction  =(params) => {
    return new Promise((resolve, reject) => {

     if(typeof(params)!='undefined'){
         resolve('ok');
         if(params.type){
          if(params.type==1){
            console.log(params.type);
            console.log(params.value);
            this.items[1].content=params.value;
          }
          else if(params.type==3){
            this.items[3].content=params.value;
          }
         }
     }else{
         reject(Error('error'))
     }
           
  });
}

}
