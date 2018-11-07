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
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register'
import { RegisterSuccessPage } from '../pages/register-success/register-success';
import { MessagePage } from '../pages/message/message';
import { DiscoverPage } from '../pages/discover/discover';
import { BrowserPage } from '../pages/browser/browser';
import { SharePage } from '../pages/share/share';
import { UsernamePage } from '../pages/username/username';
import { ShareMomentPage } from '../pages/share-moment/share-moment';
import { ShareImagePage } from '../pages/share-image/share-image';
import { ShareDetailPage } from './../pages/share-detail/share-detail';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';


import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


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
    FeedbackPage,
    LoginPage,
    RegisterPage,
    RegisterSuccessPage,
    MessagePage,
    BrowserPage,
    DiscoverPage,
    SharePage,
    UsernamePage,
    ShareMomentPage,
    ShareImagePage,
    ShareDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ionicGalleryModal.GalleryModalModule,
    EmojiPickerModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',
      backButtonText: '返回'
    }),
    IonicStorageModule.forRoot(),

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
    FeedbackPage,
    LoginPage,
    RegisterPage,
    RegisterSuccessPage,
    MessagePage,
    DiscoverPage,
    BrowserPage,
    SharePage,
    UsernamePage,
    ShareMomentPage,
    ShareImagePage,
    ShareDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ThemeableBrowser,
    QRScanner,
    Camera,
    File,
    FileTransfer,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig }
  ]
})
export class AppModule { }
