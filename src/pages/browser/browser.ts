import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the BrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})
export class BrowserPage {

  public url;  
  constructor(public navCtrl: NavController, public navParams: NavParams,private themeableBrowser: ThemeableBrowser) {
    this.url=navParams.get('url');
    console.log(this.url);
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
    console.log('ionViewDidLoad BrowserPage');
  }
  ionViewDidEnter(){
    this.themeableBrowser.create(this.url, '_self', this.options);
  }

}
