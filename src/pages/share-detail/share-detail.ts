import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import $ from 'jquery';
/**
 * Generated class for the ShareDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-detail',
  templateUrl: 'share-detail.html',
})
export class ShareDetailPage {
  public shareDetail;
  public textareaValue = '';
  public photos: any[] = [];
  public imageArray: any[] = [];
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
  public shareComments = [];
  public defaultAvatar = 'assets/imgs/avatar-default.png';
  public defaultName = '游客';
  public page = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController,
    private http: Http,
    public toastCtrl: ToastController,
    private storage: Storage,
  ) {
    this.shareDetail = navParams.get('shareDetail');
    this.doGetComments('',1);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ShareDetailPage');
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
  openModal(j) {
    this.imageArray = this.shareDetail.images;
    //图片数组转换成插件需要的数组 
    this.changeArrayToGallery(this.imageArray);
    // 显示图片预览 
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos, initialSlide: j,
    });
    modal.present();
  }

  doPublish() {
    if (this.textareaValue == '') {
      const toast = this.toastCtrl.create({
        message: '请填写评论的内容',
        duration: 1300,
        position: 'top'
      })
      toast.present();
    } else {
      let url = "https://njrzzk.com/app/a/app/tblComment/submitComment?content=" + this.textareaValue + "&picTextId=" + this.shareDetail.id + "&registarId=" + this.user.id;
      url = encodeURI(url);
      this.http.get(url).subscribe(data => {
        let temp = JSON.parse(data['_body']);
        if (temp.code == 0) {
          this.doGetComments('',1);
          //跳转到评论开头
          $("#showPagesA").attr("href", "#comments");// #showPagesA是一个a标签  #accountListDiv是要跳到位置的id值
          document.getElementById("showPagesA").click();// a标签实现点击然后跳转到指定位置

          const toast = this.toastCtrl.create({
            message: '评论成功',
            duration: 1300,
            position: 'top'
          })
          toast.present();
          this.textareaValue = '';
        }
      }, err => {
        alert(JSON.stringify(err));
      });
    }
  }

  public toggled: boolean = false;
  //切换当前选中的emoje表情
  handleSelection(event) {
    this.textareaValue = this.textareaValue + " " + event.char;
  }

  doGetComments(infiniteScroll,i) {
    if(i==1){
      this.page=1;
      this.shareComments=[];
    }else {
      // if(infiniteScroll){
      //   infiniteScroll.enable(true);
      // }
    }
    let url = "https://njrzzk.com/app/a/app/tblComment/getPagelist?pageNum="+this.page+"&picTextId=" + this.shareDetail.id;
    this.http.get(url).subscribe(data => {
      let temp = JSON.parse(data['_body']).rows;
      console.log(temp);
      this.shareComments = this.shareComments.concat(temp);
      this.page++;
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (JSON.parse(data['_body']).rows.length < 10) {
          //infiniteScroll.enable(false);
        }
      }
    }, err => {

    });
  }

  doInfinite(infiniteScroll) {
    this.doGetComments(infiniteScroll,0)
  }
}
