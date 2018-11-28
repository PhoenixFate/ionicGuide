import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '..//tabs/tabs';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  public list=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider) {
    //请求获得引导页数据
    this.httpServiceProvider.httpGet('tblGuidepage/getlist',(data)=>{
      let temp=JSON.parse(data).rows;
      let arr=[];
      arr=temp[0].mainImage.split("|");
      arr.shift();
      this.list=arr;
    });
  }

  goHome(){
    this.navCtrl.push(TabsPage);
  }
}
