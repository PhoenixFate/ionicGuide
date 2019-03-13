import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScenicSpotPage } from '../scenic-spot/scenic-spot';
import { Storage } from '@ionic/storage';
import $ from 'jquery';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

declare var BMap;
declare var baidumap_location;
declare var BMAP_NORMAL_MAP;
declare var BMAP_HYBRID_MAP;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') map_container: ElementRef;
  map: any;
  public scenicSpotPage = ScenicSpotPage;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public scenicSpot = [];
  public alarm = 0;
  public alarmImg = 'assets/imgs/alarm2.png';
  public location = { longitude: "116.404", latitude: "39.915" };
  public myInternal;
  public isPlay = false;
  public scenicSpotFlag = [];
  public speakDistance;
  public driving;
  public isNavigate = false;
  public accessToken;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public httpServiceProvider: HttpServiceProvider) {
    this.storage.get('access_token').then((value) => {
      this.accessToken = value;
    })
    var that = this;
    this.myInternal = setInterval(() => {
      that.storage.get('speakDistance').then((value) => {
        if (value == null) {
          that.speakDistance = 30
        } else {
          that.speakDistance = value;
        }
      })
      if (typeof baidumap_location === "undefined") {
        //alert("baidumap is undefined")
      } else {
        baidumap_location.getCurrentPosition((result) => {
          let myLocation = { longitude: JSON.stringify(result.longitude), latitude: JSON.stringify(result.latitude) };
          that.location = myLocation;
          if (that.scenicSpot.length === 0) {
          } else {
            for (let i = 0; i < that.scenicSpot.length; i++) {
              let lonlat = that.scenicSpot[i].lonLat;
              let arr = [];
              arr = lonlat.split(',');
              let point = new BMap.Point(arr[0], arr[1]);
              let myLocationPoint = new BMap.Point(that.location.longitude, that.location.latitude);
              let distance = (that.map.getDistance(point, myLocationPoint) - 0).toFixed(0);
              that.scenicSpot[i].distance = distance;
            }
            let minDistance = parseFloat(that.scenicSpot[0].distance);
            let minIndex = 0;
            for (let j = 0; j < that.scenicSpot.length;) {
              if (parseFloat(that.scenicSpot[j].distance) < minDistance) {
                minDistance = parseFloat(that.scenicSpot[j].distance);
                minIndex = j;
              }
              j++;
            }
            if ((minDistance < parseFloat(that.speakDistance)) && !that.isPlay && !that.scenicSpotFlag[minIndex]) {
              let url = 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=' + that.accessToken + '&tex=' + that.scenicSpot[minIndex].descriptionForRead;
              $('#speak-audio')[0].src = url;
              $('#speak-audio')[0].play();
              that.scenicSpotFlag[minIndex] = true;
              that.storage.set('scenicSpotFlag', that.scenicSpotFlag);
              that.isPlay = true;
            }
          }
          var allOverlay = that.map.getOverlays();
          for (let i = 0; i < allOverlay.length; i++) {
            if (allOverlay[i]) {
              if (allOverlay[i].id) {
                if (allOverlay[i].id = 'myLocation') {
                  that.map.removeOverlay(allOverlay[i]);
                }
              }
            }
          }
          let myIcon = new BMap.Icon("assets/imgs/my-location.png", new BMap.Size(23, 28));
          let point = new BMap.Point(JSON.stringify(result.longitude), JSON.stringify(result.latitude));
          let marker = new BMap.Marker(point);
          marker.id = "myLocation";
          marker.setIcon(myIcon);
          that.map.addOverlay(marker);
        }, error => {
          alert(error);
        });

      }
    }, 10000)
  }

  ionViewDidLoad() {
    var that = this;
    //音频播放完之后，自动改是否播放flag
    $('#speak-audio')[0].addEventListener('ended', function () {
      that.isPlay = false;
    }, false);
    this.baiduMapInitial();
  }

  ionViewDidEnter() {

  }

  baiduMapInitial() {
    console.log(this.map_container);
    //创建百度Map实例
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableClick: true });
    //添加控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]
    }));
    let point = new BMap.Point(113.332871, 24.819071);
    //设置中心点
    map.centerAndZoom(point, 17);
    //启动滚动放大缩小，默认禁用
    map.enableScrollWheelZoom(true);
    //清除覆盖物
    map.clearOverlays();
    this.driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, panel: "navigation-result-map", autoViewport: true } });
    var that = this;
    var myIcon = new BMap.Icon("assets/imgs/red-marker.png", new BMap.Size(33, 35));
    this.httpServiceProvider.httpGet('tblScenicspot/getlist', (data) => {
      let temp = JSON.parse(data).rows;
      this.storage.get('scenicSpotLength').then((result) => {
        if (result == null || result != temp.length) {
          this.storage.set('scenicSpotLength', temp.length);
          let scenicSpotFlag = [];
          for (let i = 0; i < temp.length; i++) {
            scenicSpotFlag.push(false);
          }
          this.storage.set('scenicSpotFlag', scenicSpotFlag);
        }

        this.storage.get('currentDate').then((value) => {
          let now = new Date();
          if (now.toLocaleDateString() != value) {
            let scenicSpotFlag = [];
            for (let i = 0; i < temp.length; i++) {
              scenicSpotFlag.push(false);
            }
            this.storage.set('scenicSpotFlag', scenicSpotFlag);
            this.storage.set('currentDate', now.toLocaleDateString());
          }
        });

        this.storage.get('scenicSpotFlag').then((value) => {
          this.scenicSpotFlag = value;
        });
      });
      //为各个点添加marker，并且计算距离
      for (let i = 0; i < temp.length; i++) {
        let lonlat = temp[i].lonLat;
        let arr = [];
        arr = lonlat.split(',');
        temp[i].longitude = arr[0];
        temp[i].latitude = arr[1];
        let point = new BMap.Point(arr[0], arr[1]);
        var marker = new BMap.Marker(point);
        marker.setIcon(myIcon);
        map.addOverlay(marker);
        let myLocationPoint = new BMap.Point(this.location.longitude, this.location.latitude);
        let distance = (this.map.getDistance(point, myLocationPoint) - 0).toFixed(0);
        temp[i].distance = distance;
        (function () {
          var thePoint = temp[i];
          marker.addEventListener("click", function () {
            that.showInfo(this, thePoint, i);
          });
        })();
      }
      this.scenicSpot = temp;
    })
  }

  showInfo(thisMaker, point, i) {
    let destinationPoint = new BMap.Point(point.longitude, point.latitude);
    let currentPoint = new BMap.Point(this.location.longitude, this.location.latitude);

    var that = this;
    var sContent = '<div class="infoWindow-content">'
      + '<div class="infoWindow-left">'
            +'<img src="assets/imgs/infoWindow-head.jpg" class="left-image">'
            +'<div class="infoWindow-alarm"  id="speak">'
              +'<img src="assets/imgs/shengyin.png" class="infoWindow-alarm-image"/>'
            +'</div>'
      +'</div>'
      +'<div class="infoWindow-right">'
            +'<h6 id="more" class="infoWindow-name">' + point.name + '</h6><h6>' + point.distance + ' 米</h6></div>'
      +'<div class="infoWindow-go" id="route">到这去</div>'
      +'</div>';

    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    thisMaker.openInfoWindow(infoWindow);   //图片加载完毕重绘infowindow
    //web点击事件为click，手机端点击事件为touchstart
    let url = 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=' + that.accessToken + '&tex=' + that.scenicSpot[i].descriptionForRead;
    infoWindow.addEventListener('open', function () {
      $('#more').bind("click", function () {
        that.navCtrl.push(ScenicSpotPage, { "id": point.id });
      });
      $('#more').bind("touchstart", function () {
        that.navCtrl.push(ScenicSpotPage, { "id": point.id });
      });
      $('#speak').bind("click", function () {
        $('#speak-audio')[0].src = url;
        $('#speak-audio')[0].play();
        that.isPlay = true;
        that.alarmImg = 'assets/imgs/alarm2.png';
      });
      $('#speak').bind("touchstart", function () {
        $('#speak-audio')[0].src = url;
        $('#speak-audio')[0].play();
        that.isPlay = true;
        that.alarmImg = 'assets/imgs/alarm2.png';
      });
      $('#route').bind("click", function () {
        that.driving.search(currentPoint, destinationPoint);
        that.isNavigate = true;
      });
      $('#route').bind("touchstart", function () {
        that.driving.search(currentPoint, destinationPoint);
        that.isNavigate = true;
      });
    })
    //两次绑定事件是为了解决bug
    $('#more').bind("click", function () {
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
    $('#more').bind("touchstart", function () {
      that.navCtrl.push(ScenicSpotPage, { "id": point.id });
    })
    $('#speak').bind("click", function () {
      $('#speak-audio')[0].src = url;
      $('#speak-audio')[0].play();
      that.isPlay = true;
      that.alarmImg = 'assets/imgs/alarm2.png';
    })
    $('#speak').bind("touchstart", function () {
      $('#speak-audio')[0].src = url;
      $('#speak-audio')[0].play();
      that.isPlay = true;
      that.alarmImg = 'assets/imgs/alarm2.png';
    })
    $('#route').bind("click", function () {
      that.driving.search(currentPoint, destinationPoint);
      that.isNavigate = true;
    });
    $('#route').bind("touchstart", function () {
      that.driving.search(currentPoint, destinationPoint);
      that.isNavigate = true;
    });
  };

  changeAlarm() {
    this.alarm++;
    if (this.alarm % 2 == 0) {
      $('#speak-audio')[0].play();
      this.alarmImg = 'assets/imgs/alarm2.png';
    } else {
      $('#speak-audio')[0].pause();
      this.alarmImg = 'assets/imgs/alarm1.png';
    }
  }

  showLocation() {
    if (typeof baidumap_location === "undefined") {
      //alert("baidumap is undefined");
      return;
    };
    //解决baidumap_location.getCurrentPosition卡顿没有反应的情况
    //先跳转到前一次记录的当前位置，再获取位置，再次跳转一次；解决卡顿。
    if (this.location.latitude != '116.404') {
      this.map.setZoom(15);
      var allOverlay = this.map.getOverlays();
      for (let i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i]) {
          if (allOverlay[i].id) {
            if (allOverlay[i].id = 'myLocation') {
              this.map.removeOverlay(allOverlay[i]);
            }
          }
        }
      }
      let myIcon = new BMap.Icon("assets/imgs/my-location.png", new BMap.Size(23, 28));
      let point = new BMap.Point(this.location.longitude, this.location.latitude);
      let marker = new BMap.Marker(point);
      marker.id = "myLocation";
      marker.setIcon(myIcon);
      this.map.addOverlay(marker);
      this.map.panTo(point);
    }

    var that = this;
    baidumap_location.getCurrentPosition((result) => {
      this.map.setZoom(15);
      var allOverlay = that.map.getOverlays();
      for (let i = 0; i < allOverlay.length; i++) {
        if (allOverlay[i]) {
          if (allOverlay[i].id) {
            if (allOverlay[i].id = 'myLocation') {
              that.map.removeOverlay(allOverlay[i]);
            }
          }
        }
      }
      let myIcon = new BMap.Icon("assets/imgs/my-location.png", new BMap.Size(23, 28));
      let point = new BMap.Point(JSON.stringify(result.longitude), JSON.stringify(result.latitude));
      let marker = new BMap.Marker(point);
      marker.id = "myLocation";
      marker.setIcon(myIcon);
      that.map.addOverlay(marker);
      that.map.panTo(point);

    }, error => {
      alert(error);
    });
  }

  toScenery() {
    this.map.setZoom(15);
    this.map.panTo(new BMap.Point(113.332871, 24.819071));
  }

  showNavigation() {
    let navigationResult = document.getElementById("navigation-result");
    navigationResult.style.display = "block";
  }

  closeNavigation() {
    let navigationResult = document.getElementById("navigation-result");
    navigationResult.style.display = "none";
  }

}



