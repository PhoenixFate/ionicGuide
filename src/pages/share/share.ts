import { ShareDetailPage } from './../share-detail/share-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareMomentPage } from '../share-moment/share-moment';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';
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
  public shares = [];
  public photos: any[] = [];
  public imageArray: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private modalCtrl: ModalController,
    public httpServiceProvider: HttpServiceProvider,
    public configProvider: ConfigProvider,
    public uploadImageProvider: UploadImageProvider
  ) {
    this.requestShares('');
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
    this.doRefresh('');
  }

  selectPhoto() {
    this.storage.get('publishMessage').then((value) => {
      if (value != null) {
        this.navCtrl.push(ShareMomentPage, { getStorage: 1 });
      } else {
        const actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: '文字',
              handler: () => {
                this.doText();
              }
            },
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
    })

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

  doText() {
    this.navCtrl.push(ShareMomentPage)
  }

  useCamera() {
    this.uploadImageProvider.doCamera2(this.user.id, 'tblPicTextShare/uploadFiles', (data) => {
      if (data.code == 0) {
        let imgUrl = data.rows[0].src
        this.navCtrl.push(ShareMomentPage, { imgUrl: imgUrl });
      }
    })
  }

  useLibrary() {
    this.uploadImageProvider.doLibraryManyImages2((data) => {
      this.navCtrl.push(ShareMomentPage, { results: data });
    })
  }


  requestShares(infiniteScroll) {
    //请求获得分享数据
    this.httpServiceProvider.httpGet("tblPicTextShare/getPagelist?pageNum=" + this.page, (data) => {
      let temp = JSON.parse(data).rows;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].images == [""]) {
          temp[i].images = [];
        } else {
          let arr = temp[i].images.split('|');
          for (let j = 0; j < arr.length; j++) {
            arr[j] = this.configProvider.imgHead + arr[j];
          }
          temp[i].images = arr;
        }
        let updateTime = temp[i].updateDate.split(' ');
        temp[i].updateDate = updateTime[0];
        if (temp[i].tblRegistrar.image != null) {
          temp[i].tblRegistrar.image = this.configProvider.imgHead + temp[i].tblRegistrar.image;
        } else {
          temp[i].tblRegistrar.image = "assets/imgs/avatar-default.png";
        }
      }
      this.shares = this.shares.concat(temp);
      this.page++;
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (temp.length < 10) {
          infiniteScroll.enable(false);
        }
      }
    });
    
  }

  doInfinite(infiniteScroll) {
    this.requestShares(infiniteScroll)
  }

  toShareDetail(i) {
    this.navCtrl.push(ShareDetailPage, { shareDetail: this.shares[i] });
  }

  doRefresh(refresher) {
    //请求获得轮播图数据
    this.httpServiceProvider.httpGet("tblPicTextShare/getPagelist?pageNum=" + 1, (data) => {
      let temp = JSON.parse(data).rows;
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].images == [""]) {
          temp[i].images = [];
        } else {
          let arr = temp[i].images.split('|');
          for (let j = 0; j < arr.length; j++) {
            arr[j] = this.configProvider.imgHead + arr[j];
          }
          temp[i].images = arr;
        }
        let updateTime = temp[i].updateDate.split(' ');
        temp[i].updateDate = updateTime[0];
        if (temp[i].tblRegistrar.image != null) {
          temp[i].tblRegistrar.image = this.configProvider.imgHead + temp[i].tblRegistrar.image;
        } else {
          temp[i].tblRegistrar.image = "assets/imgs/avatar-default.png";
        }
      }
      this.shares = temp;
      if (refresher) {
        refresher.complete(); //当数据请求完成调用
      }
    });
    
  }

  changeArrayToGallery(array) {
    this.photos = [];
    for (let i = 0; i < array.length; i++) {
      var object = {
        "url": array[i]
      };
      this.photos.push(object);
    }
  }

  //图片预览
  openModal(i, j) {
    this.imageArray = this.shares[i].images;
    //图片数组转换成插件需要的数组 
    this.changeArrayToGallery(this.imageArray);
    // 显示图片预览 
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos, initialSlide: j,
    });
    modal.present();
  }

}
