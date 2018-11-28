import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneryDatailsPage } from '../scenery-datails/scenery-datails';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
@Component({
  selector: 'page-scenery',
  templateUrl: 'scenery.html'
})
export class SceneryPage {
  public slides = [];
  public sceneries = [];
  public page = 1;
  constructor(public navCtrl: NavController, 
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider) {
    this.initialize();
  };

  initialize(){
    //请求获得轮播图数据
    this.httpServiceProvider.httpGet('tblImgCycle/getlist',(data)=>{
      let temp=JSON.parse(data).rows;
      let arr = [];
      for (let i = 0; i < temp.length; i++) {
        let arr = temp[i].mainImage.split('|');
        arr.shift();
        temp[i].mainImage = arr[0];
      }
      this.slides = temp;
    });
    //请求获得咨询数据(第一页)
    this.requestScenery('');
  }

  toDetails(index, id) {
    this.navCtrl.push(SceneryDatailsPage, { index: index, id: id });
  }

  requestScenery(infiniteScroll) {
    this.httpServiceProvider.httpGet("tblInformation/getPagelist?pageNum=" + this.page,(data)=>{
      if(JSON.parse(data).rows){
        let temp = JSON.parse(data).rows;
        let arr = [];
        for (let i = 0; i < temp.length; i++) {
          let arr = temp[i].mainImage.split('|');
          arr.shift();
          temp[i].mainImage = arr[0];
          let updateTime = temp[i].updateDate.split(' ');
          temp[i].updateDate = updateTime[0];
        }
        this.sceneries = this.sceneries.concat(temp);
        this.page++;
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        if (temp.length < 10) {
          infiniteScroll.enable(false);
        }
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.requestScenery(infiniteScroll)
  }

}
