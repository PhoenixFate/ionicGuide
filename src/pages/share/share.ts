import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareMomentPage } from '../share-moment/share-moment';

import { Http } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  public user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
  public loginFlag = false;
  public page = 1;
  public shares=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private camera: Camera, private transfer: FileTransfer,
    private file: File,
    private imagePicker: ImagePicker,
    public http: Http
  ) {
    this.requestScenery('');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SharePage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value == null) {
        this.user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
        this.loginFlag = false;
      } else {
        this.loginFlag = true;
        this.user = value;
      }
    })
  }

  selectPhoto() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            //this.navCtrl.push(ShareMomentPage, { imgUrl: 'assets/imgs/avatar-ben.png' });
            this.doCamera();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
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

  share() {
    if (!this.loginFlag) {
      const toast = this.toastCtrl.create({
        message: '请先登入',
        duration: 1300,
        position: 'top'
      })
      toast.present();
      return;
    } else {
      this.selectPhoto();
    }
  }

  doCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      //allowEdit:true,
      //targetHeight:300,
      //targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData) => {
      this.doUpload(ImageData);
    }, (err) => {

    })
  }

  doLibrary() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 9,
      quality: 50
    }

    this.imagePicker.getPictures(options).then((results) => {
      this.navCtrl.push(ShareMomentPage, { results: results })
    }, (err) => {

    });
  }

  doUpload(src) {
    let timestamp = new Date().getTime();
    const FileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'myfiles',
      fileName: timestamp + '.jpg',
      mimeType: 'image/jpeg',
      httpMethod: "POST",
      params: {
        id: this.user.id
      }
    }
    var api = 'https://njrzzk.com/app/a/app/tblPicTextShare/uploadFiles';
    FileTransfer.upload(src, encodeURI(api), options).then((data) => {
      let temp = JSON.parse(data['response']);
      //alert(JSON.stringify(temp));
      if (temp.code == 0) {
        let imgUrl = temp.rows[0].src
        this.navCtrl.push(ShareMomentPage, { imgUrl: imgUrl });
      }
    }, (err) => {
      alert(JSON.stringify(err));

    })
  }

  requestScenery(infiniteScroll) {
    let that = this;
    let url = "https://njrzzk.com/app/a/app/tblPicTextShare/getPagelist?pageNum=" + this.page;
    this.http.get(url).subscribe(data => {
      if (data['_body']) {
        let temp = JSON.parse(data['_body']).rows;
        let arr = [];
        for (let i = 0; i < temp.length; i++) {
          let arr = temp[i].images.split('|');
          for(let j=0;j<arr.length;j++){
            arr[j]='https://njrzzk.com' + arr[j];
          }
          temp[i].images = arr;
          let updateTime = temp[i].updateDate.split(' ');
          temp[i].updateDate = updateTime[0];
        }
        console.log(temp);
        this.shares = this.shares.concat(temp);
        this.page++;
        if (infiniteScroll) {
          infiniteScroll.complete();
          if (JSON.parse(data['_body']).rows.length < 10) {
            infiniteScroll.enable(false);
          }
        }
        
      }

    }, err => {

    })
  }

  doInfinite(infiniteScroll) {
    this.requestScenery(infiniteScroll)
  }

}
