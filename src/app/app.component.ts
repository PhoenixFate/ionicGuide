import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';

// declare const baidumap_location: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  public myInternal;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
  
    //通过key，判断曾经是否进入过引导页
    this.storage.get('firstIn').then((result) => {
      //result=false;
      if (result) {
        this.rootPage = TabsPage;
      } else {
        this.storage.set('firstIn', true);
        this.rootPage = WelcomePage;
      }
    });

    this.storage.get('currentDate').then((currentDate) => {
      let now = new Date();
      if (currentDate == null) {
        this.storage.set('currentDate', now.toLocaleDateString());
      }
    })

    this.storage.get('speakDistance').then((value) => {
      if (value == null) {
        this.storage.set('speakDistance', 30);
      }
    })

    //无效
    // this.myInternal = setInterval(function () {
    //   if (typeof baidumap_location === "undefined") {
    //     //alert("baidumap is undefined")
    //   } else {
    //     console.log("not undefined")
    //     baidumap_location.getCurrentPosition((result) => {
    //       let myLocation = { longitude: JSON.stringify(result.longitude), latitude: JSON.stringify(result.latitude) };

    //     })
    //     clearInterval(this.myInternal);
    //   }
    //   console.log("app");
    // },1000)

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}
