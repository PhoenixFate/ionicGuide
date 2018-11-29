import { TrackPage } from './../track/track';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DistancePage } from '../distance/distance';
import { VersionPage } from '../version/version';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { MessagePage } from '../message/message';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  public user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
  public loginFlag = false;
  public messageFlag=true;
  public messageNumber;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    public toastCtrl: ToastController,
    public uploadImageProvider: UploadImageProvider,
    public httpServiceProvider:HttpServiceProvider) {

  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value == null) {
        this.user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
        this.loginFlag = false;
      } else {
        this.loginFlag = true;
        this.user = value;
        this.checkMessage();
      }
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MinePage');
  }

  items = [
    { name: '语言播报距离', icon: 'megaphone' },
    { name: '个人资料', icon: 'paper' },
    { name: '查看版本', icon: 'more' },
    { name: '反馈', icon: 'heart' },
    { name: '消息', icon: 'text' },
    { name: '轨迹', icon: 'recording' }
  ];

  toDetails(index) {
    if (index == 0) {
      this.navCtrl.push(DistancePage);
    }
    else if (index == 1) {
      if (this.loginFlag) {
        this.navCtrl.push(ProfilePage);
      } else {
        const toast = this.toastCtrl.create({
          message: '请先登入',
          duration: 1300,
          position: 'top'
        })
        toast.present();
      }

    }
    else if (index == 2) {
      this.navCtrl.push(VersionPage);
    }
    else if (index == 3) {
      if (this.loginFlag) {
        this.navCtrl.push(FeedbackPage);
      } else {
        const toast = this.toastCtrl.create({
          message: '请先登入',
          duration: 1300,
          position: 'top'
        })
        toast.present();
      }
    }
    else if (index == 4) {
      if (this.loginFlag) {
        this.navCtrl.push(MessagePage);
      } else {
        const toast = this.toastCtrl.create({
          message: '请先登入',
          duration: 1300,
          position: 'top'
        })
        toast.present();
      }
    }
    else if (index == 5) {
      if (this.loginFlag) {
        this.navCtrl.push(TrackPage);
      } else {
        const toast = this.toastCtrl.create({
          message: '请先登入',
          duration: 1300,
          position: 'top'
        })
        toast.present();
      }
    }
  }

  toLogin() {
    this.navCtrl.push(LoginPage);
  }


  changeAvatar() {
    if (this.loginFlag) {
      const actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '拍照',
            handler: () => {
              this.useCamera();
            }
          },
          {
            text: '从手机相册选择',
            handler: () => {
              this.useLibrary();
            }
          },
          {
            text: '取消',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    } else {
      const toast = this.toastCtrl.create({
        message: '请先登入',
        duration: 1300,
        position: 'top'
      })
      toast.present();
    }

  }

  useCamera() {
    this.uploadImageProvider.doCamera(this.user.id,'tblRegistrar/imageUpload',(data) => {
      //更新一下本地的user
      this.storage.set('user', data.rows).then(() => {
        this.storage.get('user').then((value) => {
          if (value != null) {
            this.user = value;
          }
        })
      });
    })
  }

  useLibrary() {
    this.uploadImageProvider.doLibraryOneImage(this.user.id,'tblRegistrar/imageUpload',(data) => {
      //更新一下本地的user
      this.storage.set('user', data.rows).then(() => {
        this.storage.get('user').then((value) => {
          if (value != null) {
            this.user = value;
          }
        })
      });
    })
  }

  checkMessage() {
    this.httpServiceProvider.httpGet("tblSysMessageRecord/getUnReadMessageNum?regId="+this.user.id,(data)=>{
      let temp=JSON.parse(data);
      if(temp.rows!=0){
        this.messageFlag=false;
        this.messageNumber=temp.rows;
      }
    })
  }
}
