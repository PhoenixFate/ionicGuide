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
  public scenicSpot=[];
  constructor(public navCtrl: NavController, private platform: Platform, public http: Http) {
  }

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
      this.scenicSpot=temp;
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
            that.showInfo(this, thePoint,i);
          });
        })();
      }
    }, err => {

    });
  }

  



  showInfo(thisMaker, point,i) {
    var that = this;
    var sContent =
      '<ul style="margin:0 0 5px 0;z-index:100" >'
      + '<li style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px">'
      + '<span style="width: 80px;display: inline-block;">名称：</span>' + point.name + '</li>'
      + '<li id="more"  style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px;font-weight:bold"><span style="width: 80px;display: inline-block;">查看：</span>详情</li>'
      + '<li style="line-height: 26px;font-size: 16px; text-align:center;margin-top:12px">'
      + '<button style="height:30px;width=260px;margin:0 auto;padding:2px 12px;background-color:#32db64;" id="speak">点击进行语音播报</button></li>'
      + '</ul>';
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    thisMaker.openInfoWindow(infoWindow);   //图片加载完毕重绘infowindow
    //web点击事件为click，手机端点击事件为touchstart
    let url='http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.c9db7b3df791be77a72b9fd8250486f3.2592000.1540103485.282335-11796257&tex='+that.scenicSpot[i].descriptionForRead;
    infoWindow.addEventListener('open', function () {
      $('#more').bind("click", function(){
        that.navCtrl.push(ScenicSpotPage, { "id": point.id });
      });
      $('#more').bind("touchstart", function(){
        that.navCtrl.push(ScenicSpotPage, { "id": point.id  });
      });
      $('#speak').bind("click", function(){
        $('#speak-audio')[0].src=url;
        $('#speak-audio')[0].play();
        that.alarmImg='assets/imgs/alarm2.png';
      });
      $('#speak').bind("touchstart", function(){
        $('#speak-audio')[0].src=url;
        $('#speak-audio')[0].play();
        that.alarmImg='assets/imgs/alarm2.png';
      });
    })
    $('#more').bind("click", function(){
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
    $('#more').bind("touchstart", function(){
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
    $('#speak').bind("click", function(){
        $('#speak-audio')[0].src=url;
        $('#speak-audio')[0].play();
        that.alarmImg='assets/imgs/alarm2.png';
    })
    $('#speak').bind("touchstart", function(){
        $('#speak-audio')[0].src=url;
        $('#speak-audio')[0].play();
        that.alarmImg='assets/imgs/alarm2.png';
    })
  };

  public alarm=0;
  public alarmImg='assets/imgs/alarm2.png';
  changeAlarm(){
    this.alarm++;
    if(this.alarm%2==0){
      $('#speak-audio')[0].play();
      this.alarmImg='assets/imgs/alarm2.png';
    }else {
      $('#speak-audio')[0].pause();
      this.alarmImg='assets/imgs/alarm1.png';
    }
  }

}



