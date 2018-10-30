import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp} from '@angular/http';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.index=this.navParams.get("index");
    let id=this.navParams.get("id");
    console.log(id);
    let url="https://njrzzk.com/app/a/app/tblInformation/getDetail?id="+id;
    this.http.get(url).subscribe(data=>{
      let temp=JSON.parse(data['_body']).rows;
      console.log(temp);
      console.log("------------------")
      this.desc=temp[0].descriptionForApp;
      console.log(this.desc);
    },err=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SceneryDatailsPage');
  }

}
