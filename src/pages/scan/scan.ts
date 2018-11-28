import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/** * Generated class for the ScanPage page. * * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation. */
//@IonicPage()
@Component({ selector: 'page-scan', templateUrl: 'scan.html', })
export class ScanPage {
  light: boolean;//判断闪光灯 
  frontCamera: boolean;//判断摄像头 
  isShow: boolean = false;//控制显示背景，避免切换页面卡顿 
  constructor(private navCtrl: NavController, private navParams: NavParams, private qrScanner: QRScanner, private viewCtrl: ViewController, private themeableBrowser: ThemeableBrowser) { //默认为false 
    this.light = false;
    this.frontCamera = false;
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
    backButtonCanClose: false
  };
  ionViewDidLoad() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) { // camera permission was granted // start scanning 
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          //alert(text);
          this.themeableBrowser.create(text, '_self', this.options);
          this.qrScanner.hide(); // hide camera preview 
          scanSub.unsubscribe(); // stop scanning 
          this.navCtrl.pop();
        }); // show camera preview 
        this.qrScanner.show();
        // wait for user to scan something, then the observable callback will be called 
      } else if (status.denied) {
        // camera permission was permanently denied 
        // you must use QRScanner.openSettings() method to guide the user to the settings page 
        // then they can grant the permission from there 
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time. 
      }
    }).catch((e: any) => console.log('Error is', e));
  }
  ionViewDidEnter() {
    //页面可见时才执行 
    this.showCamera();
    this.isShow = true;//显示背景 
  } /** * 闪光灯控制，默认关闭 */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  } /** * 前后摄像头互换 */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着 
    this.qrScanner.destroy();//关闭 
  }
  ionViewWillLeave() {
    this.hideCamera();
  }
}

