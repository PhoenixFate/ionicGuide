import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
import { SharePage } from '../share/share';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private themeableBrowser: ThemeableBrowser) {
  }
  private options: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffffff'
    },
    toolbar: {
      height: 44,
      color: '#f0f0f0ff'
    },
    title: {
      color: '#003264ff',
      showPageTitle: true
    },
    backButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      image: 'forward',
      imagePressed: 'forward_pressed',
      align: 'left',
      event: 'forwardPressed'
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    // customButtons: [
    //     {
    //         image: 'share',
    //         imagePressed: 'share_pressed',
    //         align: 'right',
    //         event: 'sharePressed'
    //     }
    // ],
    // menu: {
    //     image: 'menu',
    //     imagePressed: 'menu_pressed',
    //     title: 'Test',
    //     cancel: 'Cancel',
    //     align: 'right',
    //     items: [
    //         {
    //             event: 'helloPressed',
    //             label: 'Hello World!'
    //         },
    //         {
    //             event: 'testPressed',
    //             label: 'Test!'
    //         }
    //     ]
    // },
    backButtonCanClose: true
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoverPage');
  }

  toScan() {
    this.navCtrl.push(ScanPage);
  }

  toJD() {
    this.themeableBrowser.create('https://www.jd.com', '_self', this.options);
  }

  toTB(){
    this.themeableBrowser.create('https://www.taobao.com', '_self', this.options);
  }

  toShare(){
    this.navCtrl.push(SharePage);
  }
}
