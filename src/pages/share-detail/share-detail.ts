import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.shareDetail = navParams.get('shareDetail');
    console.log(this.shareDetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareDetailPage');
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
    console.log(this.textareaValue);
  }

  public toggled: boolean = false;
  //切换当前选中的emoje表情
  handleSelection(event) {
    console.log(event.char);
    this.textareaValue = this.textareaValue + " " + event.char;
  }
}
