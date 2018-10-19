import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneryDatailsPage } from '../scenery-datails/scenery-datails';
import { Http, Jsonp } from '@angular/http';

@Component({
  selector: 'page-scenery',
  templateUrl: 'scenery.html'
})
export class SceneryPage {
  public slides = [];
  public sceneries = [];
  public page = 1;
  constructor(public navCtrl: NavController, public http: Http) {
    let url = 'https://njrzzk.com/app/a/app/tblImgCycle/getlist';
    this.http.get(url).subscribe(data => {
      let temp = JSON.parse(data['_body']).rows;
      let arr = [];
      for (let i = 0; i < temp.length; i++) {
        let arr = temp[i].mainImage.split('|');
        arr.shift();
        arr[0] = 'https://njrzzk.com/' + arr[0];

        temp[i].mainImage = arr[0];
        let updateTime = temp[i].updateDate.split(' ');
        temp[i].updateDate = updateTime[0];
      }
      this.slides = temp;
    }, err => {

    });
    this.requestScenery('');
  };

  toDetails(index, id) {
    this.navCtrl.push(SceneryDatailsPage, { index: index, id: id });
  }

  requestScenery(infiniteScroll) {
    let that = this;
    let url = "https://njrzzk.com/app/a/app/tblInformation/getPagelist?pageNum=" + this.page;
    this.http.get(url).subscribe(data => {
      if (data['_body']) {
        let temp = JSON.parse(data['_body']).rows;
        let arr = [];
        for (let i = 0; i < temp.length; i++) {
          let arr = temp[i].mainImage.split('|');
          arr.shift();
          arr[0] = 'https://njrzzk.com/' + arr[0];
          temp[i].mainImage = arr[0];
          let updateTime = temp[i].updateDate.split(' ');
          temp[i].updateDate = updateTime[0];
        }
        this.sceneries = this.sceneries.concat(temp);
        this.page++;
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        if (JSON.parse(data['_body']).rows.length < 10) {
          infiniteScroll.enable(false);
        }
      }

    }, err => {

    })
  }

  doInfinite(infiniteScroll) {
    this.requestScenery(infiniteScroll)
  }

}
