import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  public myInternal;
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private storage: Storage, 
    public httpServiceProvider:HttpServiceProvider) {
    //请求获得百度语音token
    this.httpServiceProvider.httpGet('tblInformation/getBaiduDescription',(data)=>{
      if (JSON.parse(data).access_token) {
        this.storage.set('access_token', JSON.parse(data).access_token);
      }
    });
    //通过key，判断曾经是否进入过引导页
    this.storage.get('firstIn').then((result) => {
      //result=false;//强制显示
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

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}
