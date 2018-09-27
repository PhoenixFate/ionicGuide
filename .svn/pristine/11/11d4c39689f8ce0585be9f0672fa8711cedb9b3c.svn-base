import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '..//tabs/tabs';
import { Http, Jsonp } from '@angular/http';

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
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/imgs/ica-slidebox-img-3.png",
    }
  ];

  public list=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    let url='https://njrzzk.com/app/a/app/tblGuidepage/getlist';
    this.http.get(url).subscribe((data)=>{
      let temp=JSON.parse(data['_body']).rows;
      let arr=[];
      arr=temp[0].mainImage.split("|");
      arr.shift();
      for(let i=0;i<arr.length;i++){
        arr[i]='https://njrzzk.com/'+arr[i];
      }
      console.log(arr);
      this.list=arr;
    },(err)=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goHome(){
    this.navCtrl.push(TabsPage);
  }
}
