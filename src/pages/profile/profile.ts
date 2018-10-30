import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NicknamePage } from '../nickname/nickname'
import { PhoneNumberPage } from '../phone-number/phone-number';
import { Storage } from '@ionic/storage';
import { UsernamePage } from '../username/username';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file' ;
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
  public items = ["头像", "用户名", "昵称", "性别", "手机号"];
  public user = { username: '', phone: '', image: '', nickname: '', sex: '', id: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private storage: Storage, public http: Http, public toastCtrl: ToastController, private camera: Camera,private transfer:FileTransfer, private file:File) {

  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value != null) {
        this.user = value;
      }

    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

  changeProfile(index) {
    var that = this;
    if (index == 0) {
      this.changeAvatar();
    } else if (index == 1) {
      this.navCtrl.push(UsernamePage);
    } else if (index == 2) {
      this.navCtrl.push(NicknamePage);
    } else if (index == 3) {
      this.changeSex();
    } else if (index == 4) {
      this.navCtrl.push(PhoneNumberPage);
    }

  }

  changeAvatar() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler:()=>{
            this.doCamera();
          }
        },
        {
          text: '从手机相册选择',
          handler:()=>{
            this.doLibrary();
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }



  changeSex() {
    var that = this;
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '男',
          handler: () => {
            this.doChangeSex(1);
          }
        },
        {
          text: '女',
          handler: () => {
            this.doChangeSex(2);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  exit() {
    var that = this;
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '确认退出',
          role: 'destructive',
          handler: () => {
            this.storage.remove('user');
            this.navCtrl.pop();
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  // 用于pop 回调的 block
  myCallbackFunction = (params) => {
    return new Promise((resolve, reject) => {
      if (typeof (params) != 'undefined') {
        resolve('ok');
        if (params.type) {
          if (params.type == 1) {
          }
          else if (params.type == 3) {
          }
        }
      } else {
        reject(Error('error'))
      }
    });
  }

  doChangeSex(sex){
    let id = this.user.id;
    let url = "https://njrzzk.com/app/a/app/tblRegistrar/update?id=" + this.user.id + "&&sex=" + sex;
    this.http.get(url).subscribe(data => {
      let temp = JSON.parse(data['_body']);
      let msg;
      if (temp.code == 0) {
        msg='修改成功';
        this.storage.set('user', temp.rows).then((result) => {
          this.storage.get('user').then((value) => {
            console.log(value);
            if (value != null) {
              this.user = value;
            }
          })
        });
      } else {
        msg=temp.msg;
      }
      const toast = this.toastCtrl.create({
        message: msg,
        duration: 1000,
        position: 'top'
      })
      toast.present();
    });
  }



  doCamera(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      allowEdit:true,
      targetHeight:300,
      targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData)=>{
        this.doUpload(ImageData);
    },(err)=>{

    })
  }

  doLibrary(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,
      targetHeight:300,
      targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData)=>{
        this.doUpload(ImageData);
    },(err)=>{

    })
  }

  doUpload(src) {
    let timestamp=new Date().getTime();
    const FileTransfer:FileTransferObject=this.transfer.create();
    let options:FileUploadOptions= {
      fileKey:'file',
      fileName:timestamp+'.jpg',
      mimeType:'image/jpeg',
      httpMethod:"POST",
      params:{
        id:this.user.id
      }
    }
    var api='https://njrzzk.com/app/a/app/tblRegistrar/imageUpload';
    FileTransfer.upload(src,encodeURI(api),options).then((data)=>{
      let temp = JSON.parse(data['response']);
      this.storage.set('user', temp.rows).then((result) => {
        this.storage.get('user').then((value) => {
          if (value != null) {
            this.user = value;
          }
        })
      });
    },(err)=>{
      
    })
  }


}
