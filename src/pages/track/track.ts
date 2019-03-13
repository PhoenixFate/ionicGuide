import { Component,ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// baidu map
declare var BMap;
declare var baidumap_location;
declare var BMAP_NORMAL_MAP;
declare var BMAP_HYBRID_MAP;

@IonicPage()
@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  pointArray: any;
  markerArray: any = [];
  public myInternal;
  public index = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidEnter() {
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });//创建地图实例
    //控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]
    }));

    

    let point=new BMap.Point(118.812972,32.017463);
    map.centerAndZoom(point, 13);//设置中心和地图显示级别

    let sizeMap = new BMap.Size(10, 80);//显示位置

    map.enableScrollWheelZoom(true);//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom(true);//连续缩放效果，默认禁用

    this.pointArray = [
      new BMap.Point(118.782972,32.012463),
      new BMap.Point(118.782972,32.015463),
      new BMap.Point(118.802972,32.016463),
      new BMap.Point(118.812972,32.017463),
      new BMap.Point(118.822972,32.018463),
      new BMap.Point(118.832972,32.020463),
      new BMap.Point(118.822972,32.018),
      new BMap.Point(118.802972,32.020463)
    ];

    for (var i = 0; i < this.pointArray.length; i++) {
      this.markerArray.push(new BMap.Marker(this.pointArray[i]));
    }
    

    var polyline = new BMap.Polyline(this.pointArray, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});   //创建折线
    this.map.addOverlay(polyline);
    for (var i = 0; i < this.pointArray.length; i++) {
      let pt=this.pointArray[i];
      let iconName="assets/imgs/red-marker"+(i+1)+".png";
      let myIcon=new BMap.Icon(iconName,new BMap.Size(40,30));
      let marker=new BMap.Marker(pt,{icon:myIcon});
      this.map.addOverlay(marker);            //增加点
    }
  }

 



}
