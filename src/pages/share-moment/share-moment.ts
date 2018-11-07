import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareImagePage } from '../share-image/share-image';

import { Http, Headers, Jsonp } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { TranslationWidth } from '@angular/common';
import { stringify } from '@angular/core/src/render3/util';


import { Observable } from 'rxjs/Observable';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the ShareMomentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-moment',
  templateUrl: 'share-moment.html',
})
export class ShareMomentPage {
  public user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
  // public imgs=["assets/imgs/avatar-luke.png",
  // "assets/imgs/avatar-luke.png",
  // "assets/imgs/avatar-han.png",
  // "assets/imgs/avatar-leia.png",
  // "assets/imgs/avatar-poe.png",
  // "assets/imgs/avatar-rey.png",
  // "assets/imgs/avatar-finn.png",
  // "assets/imgs/avatar-ben.png"];
  public imgs = [];
  public textareaValue = '';
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public formData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private http: Http,
    private jsonp: Jsonp,
    private imagePicker: ImagePicker
  ) {
    let imgUrl = navParams.get('imgUrl');
    let results = navParams.get('results');
    if (imgUrl) {
      this.imgs.push(imgUrl);
    }
    if (results) {
      this.doImagesUpload(results);
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShareMomentPage');
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value == null) {
        this.user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
      } else {
        this.user = value;
      }
    })
  }

  doPublish() {
    if (this.textareaValue == '') {
      const toast = this.toastCtrl.create({
        message: '请填写分享的内容',
        duration: 1300,
        position: 'top'
      })
      toast.present();
    } else {
      let images = '';
      for (let i = 0; i < this.imgs.length; i++) {
        if (i < this.imgs.length - 1) {
          images += this.imgs[i] + '|';
        } else {
          images += this.imgs[i];
        }
      }
      let url = "https://njrzzk.com/app/a/app/tblPicTextShare/submitShare";

      this.http.post(url, JSON.stringify({ "content": this.textareaValue, "images": images, 'tblRegistrar': { 'id': this.user.id } }), { headers: this.headers }).subscribe(data => {
        let temp = JSON.parse(data['_body']);
        if (temp.code == 0) {
          this.navCtrl.popTo(this.navCtrl.getByIndex(1));
        }
      }, err => {
        alert(JSON.stringify(err));
      });
    }

  }



  selectPhoto() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            //this.imgs.push('assets/imgs/avatar-luke.png');
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

  doCamera() {
    const options: CameraOptions = {
      quality: 60,
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
      maximumImagesCount: 9 - (this.imgs.length),
      quality: 60
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        this.doUpload(results[i]);
      }
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
      if (temp.code == 0) {
        let imgUrl = temp.rows[0].src;
        this.imgs.push(imgUrl);
      }
    }, (err) => {

    })
  }


  toShareImage(i) {
    this.navCtrl.push(ShareImagePage, { imgUrl: this.imgs[i], index: i, callback: this.myCallbackFunction });
  }


  // 用于pop 回调的 block
  myCallbackFunction = (params) => {
    return new Promise((resolve, reject) => {
      if (typeof (params) != 'undefined') {
        resolve('ok');
        this.imgs.splice(params, 1);
      } else {
        reject(Error('error'))
      }
    });
  }


  private ImagesUpload(filePaths: Array<string>): Observable<any> {
    //每个文件上传任务创建一个信号
    var observables: Array<any> = [];
    filePaths.forEach((value: string, i, array) => {
      if (!value.startsWith('file://')) {
        value = 'file://' + value;
      }
      var observable = new Observable((sub: any) => {
        this.file.resolveLocalFilesystemUrl(value).then(entry => {
          (<FileEntry>entry).file(file => {
            // this.readFile(<Blob>file);
            let blob: Blob = <Blob>file;
            const reader = new FileReader();
            let timestamp = new Date().getTime();
            reader.onloadend = () => {
              const imgBlob = new Blob([reader.result], { type: blob.type });
              this.formData.append('myfiles', imgBlob, timestamp + 'multy.jpg');
              sub.next(null);
              sub.complete();
            };
            reader.readAsArrayBuffer(blob);
          });
        })
          .catch(error => console.log('报错了，日了狗----->' + JSON.stringify(error)));
      });
      observables.push(observable);
    });
    return ForkJoinObservable.create(observables);
  }

  doImagesUploadFile(host: string, params: Map<string, string>, filePaths: Array<string>, context: any, success: Function, fail: Function) {
    this.formData = new FormData();
    this.ImagesUpload(filePaths).subscribe(data => {
      params.forEach((value, key) => {
        this.formData.append(key, value);
      });
      this.http.post(host, this.formData).toPromise().then(res => {
        success.call(context, res);
      }).catch(error => {
        fail.call(context, error);
      });
      // .catch(e => this.handleError(e))
      // .map(response => response.text())
      // // .finally(() => console.log('完成了'))
      // .subscribe(ok => console.log('上传成功了'));
    }, error => {
      console.log('文件处理失败');
    });
  }

  //入口
  doImagesUpload(images) {
    let host = 'https://njrzzk.com/app/a/app/tblPicTextShare/uploadImages';
    let params = new Map();
    params.set('id', this.user.id);
    this.doImagesUploadFile(host, params, images, self, res => {
      let temp = JSON.parse(res['_body']);
      if (temp.code == 0) {
        for(let i=0;i<temp.rows.length;i++){
          let imgUrl = temp.rows[i].src;
          this.imgs.push(imgUrl);
        }
      }
    }, error => {
      alert(JSON.stringify(error));
    });
  }

}
