import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SceneryPage } from '../pages/scenery/scenery';
import { ScanPage } from '../pages/scan/scan';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MinePage } from '../pages/mine/mine';
import { SceneryDatailsPage } from '../pages/scenery-datails/scenery-datails';
import { ScenicSpotPage } from '../pages/scenic-spot/scenic-spot';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProfilePage } from '../pages/profile/profile';
import { DistancePage } from '../pages/distance/distance';
import { IonicStorageModule } from '@ionic/storage';
import { VersionPage } from '../pages/version/version';
import { NicknamePage } from '../pages/nickname/nickname';
import { PhoneNumberPage } from '../pages/phone-number/phone-number'
import { FeedbackPage } from '../pages/feedback/feedback'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


import { HttpModule, JsonpModule } from '@angular/http'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SceneryPage,
    ScanPage,
    HomePage,
    TabsPage,
    MinePage,
    SceneryDatailsPage,
    ScenicSpotPage,
    WelcomePage,
    ProfilePage,
    DistancePage,
    VersionPage,
    NicknamePage,
    PhoneNumberPage,
    FeedbackPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true',
      backButtonText:'返回'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SceneryPage,
    ScanPage,
    HomePage,
    TabsPage,
    MinePage,
    SceneryDatailsPage,
    ScenicSpotPage,
    WelcomePage,
    ProfilePage,
    DistancePage,
    VersionPage,
    NicknamePage,
    PhoneNumberPage,
    FeedbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    ThemeableBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
