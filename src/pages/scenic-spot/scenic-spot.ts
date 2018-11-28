import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the ScenicSpotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scenic-spot',
  templateUrl: 'scenic-spot.html',
})
export class ScenicSpotPage {
  public desc;
  public audio=new Audio();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpServiceProvider:HttpServiceProvider,
    ) {
    let id=navParams.get("id");
    //请求获得景点数据
    this.httpServiceProvider.httpGet("tblScenicspot/getDetail?id="+id,(data)=>{
      let temp=JSON.parse(data).rows;
      this.desc=temp[0].descriptionForApp;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ScenicSpotPage');
  }

}
