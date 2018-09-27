import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
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
  public id;
  public desc;
  public descRead;
  public audio=new Audio();
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.id=navParams.get("id");
    let url="https://njrzzk.com/app/a/app/tblScenicspot/getDetail?id="+navParams.get("id");
    this.http.get(url).subscribe(data=>{
      let temp=JSON.parse(data['_body']).rows;
      this.desc=temp[0].description;
      this.descRead=temp[0].descriptionForRead;   
      console.log(temp);
    },err=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScenicSpotPage');
  }

  doSpeak(){
    let url='http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.c9db7b3df791be77a72b9fd8250486f3.2592000.1540103485.282335-11796257&tex='+this.descRead;
    this.audio.src=url;
    this.audio.play();

  }
}
