import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareImagePage } from '../share-image/share-image';
import { Http, Headers } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import $ from 'jquery';

import { UploadImageProvider } from '../../providers/upload-image/upload-image';
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
    private http: Http,
    public uploadImageProvider: UploadImageProvider) {
    let imgUrl = navParams.get('imgUrl');
    let results = navParams.get('results');
    let getStorage = navParams.get('getStorage');
    if (getStorage) {
      this.storage.get('publishMessage').then((value) => {
        this.imgs = value.imgs;
        this.textareaValue = value.textareaValue;
      })
    }
    if (imgUrl) {
      this.imgs.push(imgUrl);
    }
    if (results) {
      this.uploadImageProvider.doImagesUpload(results, this.user.id, (data) => {
        if (data.code == 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let imgUrl = data.rows[i].src;
            this.imgs.push(imgUrl);
          }
        }
      });
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
          this.storage.remove('publishMessage');
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
  }

  useCamera() {
    this.uploadImageProvider.doCamera2(this.user.id, 'tblPicTextShare/uploadFiles', (data) => {
      if (data.code == 0) {
        let imgUrl = data.rows[0].src;
        this.imgs.push(imgUrl);
      }
    })
  }

  useLibrary() {
    this.uploadImageProvider.doLibraryManyImages(this.imgs.length, this.user.id, (data) => {
      if (data.code == 0) {
        for (let i = 0; i < data.rows.length; i++) {
          let imgUrl = data.rows[i].src;
          this.imgs.push(imgUrl);
        }
      }
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


  doCancel() {
    this.storage.remove('publishMessage');
    this.navCtrl.pop();
  }

  goBack() {
    $('#save-all').show();
  }

  doSave() {
    let publishMessage = { 'imgs': this.imgs, 'textareaValue': this.textareaValue };
    this.storage.set('publishMessage', publishMessage);
    this.navCtrl.pop();
  }

}
