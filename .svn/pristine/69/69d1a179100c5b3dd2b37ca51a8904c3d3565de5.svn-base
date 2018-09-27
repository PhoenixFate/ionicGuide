import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SceneryDatailsPage } from '../scenery-datails/scenery-datails';
import { Http, Jsonp} from '@angular/http';

@Component({
  selector: 'page-scenery',
  templateUrl: 'scenery.html'
})
export class SceneryPage {
  // public slides=[
  //   {
  //     image:'assets/imgs/1.jpg'
  //   },
  //   {
  //     image:'assets/imgs/2.jpg'
  //   },
  //   {
  //     image:'assets/imgs/3.jpg'
  //   },
  //   {
  //     image:'assets/imgs/4.jpg'
  //   }
  // ];
  // public sceneries=[
  //   {
  //     src:'assets/imgs/thumbnail-totoro.png',
  //     title:'My Neighbor Totoro',
  //     content:'Hayao Miyazaki • 1988'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-rotla.png',
  //     title:'Raiders of the Lost Ark',
  //     content:'Steven Spielberg • 1981'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-ghostbusters.png',
  //     title:'Ghostbusters',
  //     content:'Ivan Reitman • 1984'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-batman.png',
  //     title:'Batman',
  //     content:'Tim Burton • 1988'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-bttf.png',
  //     title:'Back to the Future',
  //     content:'Robert Zemeckis • 1985'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-esb.png',
  //     title:'The Empire Strikes Back',
  //     content:'Irvin Kershner • 1980'
  //   },
  //   {
  //     src:'assets/imgs/thumbnail-terminator.png',
  //     title:'The Terminator',
  //     content:'James Cameron • 1984'
  //   }
  // ]
  public slides=[];
  public sceneries=[];
  public page=1;
  constructor(public navCtrl: NavController,public http:Http) {
    let url='https://njrzzk.com/app/a/app/tblImgCycle/getlist';
    this.http.get(url).subscribe(data=>{
      let temp=JSON.parse(data['_body']).rows;
      let arr=[];
      for(let i=0;i<temp.length;i++){
        let arr=temp[i].mainImage.split('|');
        arr.shift();
        arr[0]='https://njrzzk.com/'+arr[0];
        temp[i].mainImage=arr[0];
      }
      this.slides=temp;
      console.log(this.slides);
    },err=>{

    });
    this.requestScenery('');
  };

  toDetails(index,id){
    this.navCtrl.push(SceneryDatailsPage,{index:index,id:id});
  }

  requestScenery(infiniteScroll){
    let that=this;
    let url="https://njrzzk.com/app/a/app/tblInformation/getPagelist?pageNum="+1;
    this.http.get(url).subscribe(data=>{
      if(data['_body']){
        let temp=JSON.parse(data['_body']).rows;
        let arr=[];
        for(let i=0;i<temp.length;i++){
          let arr=temp[i].mainImage.split('|');
          console.log(arr);
          arr.shift();
          arr[0]='https://njrzzk.com/'+arr[0];
          temp[i].mainImage=arr[0];
        }
        this.sceneries=temp;
        this.page++;
        if(infiniteScroll){
          infiniteScroll.complete();
        }
        if(JSON.parse(data['_body']).rows.length<1){
          infiniteScroll.enable(false);
        }
      }
      
    },err=>{

    })
  }

  doInfinite(infiniteScroll){
    this.requestScenery(infiniteScroll)
  }

}
