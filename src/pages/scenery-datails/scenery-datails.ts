import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the SceneryDatailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scenery-datails',
  templateUrl: 'scenery-datails.html',
})
export class SceneryDatailsPage {
  public index:any;
  public desc;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpServiceProvider:HttpServiceProvider,
    ) {
    this.index=this.navParams.get("index");
    let id=this.navParams.get("id");
    //请求获得风景详情数据
    this.httpServiceProvider.httpGet("tblInformation/getDetail?id="+id,(data)=>{
      let temp=JSON.parse(data).rows;
      this.desc=temp[0].descriptionForApp;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SceneryDatailsPage');
  }

}
