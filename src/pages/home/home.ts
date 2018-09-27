import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScenicSpotPage } from '../scenic-spot/scenic-spot';
import { Http } from '@angular/http';
import $ from 'jquery';

declare var BMap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') map_container: ElementRef;
  map: any;
  public scenicSpotPage = ScenicSpotPage;
  public headers=new Headers({'Content-Type':'application/json'});
  public music;
  constructor(public navCtrl: NavController, private platform: Platform, public http: Http) {
    // this.CreateBaiduMap();
    let str='abcdefg';
    let str2=encodeURI(str);
    console.log(str2);
    // let url='http://tsn.baidu.com/text2audio';
    // this.http.post(url,JSON.stringify({lan:'zh',ctp:1,cuid:'abcdxxx',tok:'24.c9db7b3df791be77a72b9fd8250486f3.2592000.1540103485.282335-11796257',tex:'%e7%99%be%e5%ba%a6%e4%bd%a0%e5%a5%bd'}),{headers:this.headers}).subscribe(data=>{

    // },err=>{

    // })
    // let url='http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.c9db7b3df791be77a72b9fd8250486f3.2592000.1540103485.282335-11796257&tex=%e7%99%be%e5%ba%a6%e4%bd%a0%e5%a5%bd';
    // this.http.get(url).subscribe(data=>{
    //   this.music=data['_body'];
    //   console.log(data['_body']);
    //   var audio=new Audio(url);
    //   audio.play();
    // },err=>{
    // });
  }

  //ionViewDidEnter
  ionViewDidEnter() {
    //创建百度Map实例
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableClick: true });
    //添加控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    // map.addControl(new BMap.MapTypeControl({mapTypes:["BMAP_NORMAL_MAP","BMAP_HYBRID_MAP"]}));
    map.addControl(new BMap.MapTypeControl());
    let point = new BMap.Point(113.332871, 24.819071);
    //设置中心点
    map.centerAndZoom(point, 17);
    //启动滚动放大缩小，默认禁用
    map.enableScrollWheelZoom(true);
    var that = this;
    var myIcon = new BMap.Icon("assets/imgs/red-marker.png", new BMap.Size(33, 35));
    let url = "https://njrzzk.com/app/a/app/tblScenicspot/getlist";
    this.http.get(url).subscribe(data => {
      let temp = JSON.parse(data['_body']).rows;
      console.log(temp);
      for (let i = 0; i < temp.length; i++) {
        let lonlat = temp[i].lonLat;
        let arr = [];
        arr = lonlat.split(',');
        let point = new BMap.Point(arr[0], arr[1]);
        var marker = new BMap.Marker(point);
        marker.setIcon(myIcon);
        map.addOverlay(marker);
        (function () {
          var thePoint = temp[i];
          marker.addEventListener("click", function () {
            that.showInfo(this, thePoint);
          });
        })();
      }
    }, err => {

    });
  }


  showInfo(thisMaker, point) {
    var that = this;
    var sContent =
      '<ul style="margin:0 0 5px 0;z-index:100" >'
      + '<li style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px">'
      + '<span style="width: 50px;display: inline-block;">名称：</span>' + point.name + '</li>'
      + '<li id="more"  style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px"><span style="width: 50px;display: inline-block;">查看：</span>详情</li>'
      // + '<li style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px">'
      // + '<button style="height:30px;width=260px;margin:0 auto">点击进行语音播报</button></li>'
      + '</ul>';
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    thisMaker.openInfoWindow(infoWindow);   //图片加载完毕重绘infowindow
    //web点击事件为click，手机端点击事件为touchstart
    infoWindow.addEventListener('open', function () {
      $('#more').bind("click", function () {
        that.navCtrl.push(ScenicSpotPage, { "id": point.id });
      });0
      $('#more').bind("touchstart", function () {
        that.navCtrl.push(ScenicSpotPage, { "id": point.id });
      });
    })
    $('#more').bind("click", function () {
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
    $('#more').bind("touchstart", function () {
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
  };

  toScenicSpot(id) {
    this.navCtrl.push(ScenicSpotPage, { "id": id });
  }

}



