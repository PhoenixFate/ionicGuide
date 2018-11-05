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
import { Http } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
  public user={username:'',phone:'',image:'',id:'',sex:'',nickname:''};
  public loginFlag=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, private storage: Storage, 
    public http: Http, public toastCtrl: ToastController, 
    private camera: Camera,private transfer:FileTransfer,
     private file:File) {
  }

  ionViewDidEnter(){
    this.storage.get('user').then((value) => {
      if(value==null){
        this.user={username:'',phone:'',image:'',id:'',sex:'',nickname:''};
        this.loginFlag=false;
      }else {
        this.loginFlag=true;
        this.user=value;
      }
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MinePage');
  }

  items = [
    {name:'语言播报距离',icon:'megaphone'},
    {name:'个人资料',icon:'paper'},
    {name:'查看版本',icon:'more'},
    {name:'反馈',icon:'heart'},
    {name:'消息',icon:'text'}
  ];

  toDetails(index){
    if(index==0){
      this.navCtrl.push(DistancePage);
    }
    else if(index==1){
      if(this.loginFlag){
        this.navCtrl.push(ProfilePage);
      }else {
        const toast=this.toastCtrl.create({
          message:'请先登入',
          duration:1300,
          position:'top'
        })
        toast.present();
      }
     
    }
    else if(index==2){
      this.navCtrl.push(VersionPage);
    }
    else if(index==3){
      if(this.loginFlag){
        this.navCtrl.push(FeedbackPage);
      }else {
        const toast=this.toastCtrl.create({
          message:'请先登入',
          duration:1300,
          position:'top'
        })
        toast.present();
      }
    }
    else if(index==4){
      if(this.loginFlag){
        this.navCtrl.push(MessagePage);
      }else {
        const toast=this.toastCtrl.create({
          message:'请先登入',
          duration:1300,
          position:'top'
        })
        toast.present();
      }
    }
  }

  toLogin(){
    this.navCtrl.push(LoginPage);
  }


  changeAvatar() {
    if(this.loginFlag){
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
    }else {
      const toast=this.toastCtrl.create({
        message:'请先登入',
        duration:1300,
        position:'top'
      })
      toast.present();
    }
    
  }

  doCamera(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,
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
