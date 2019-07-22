import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';
import { NgForm } from "@angular/forms"
import { RegisterPage } from '../register/register'
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


// import { LoginInfoService } from "../../service/login-info.service";
// import { Md5 } from "ts-md5/dist/md5";

// 引入微信服务
declare var Wechat: any;




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public username='';
  public password='';
  public remember=false;
  constructor(public navCtrl: NavController, 
    public loadingController:LoadingController,
    public navParams: NavParams,
    private storage: Storage,
    public toastCtrl:ToastController,
    public httpServiceProvider:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter(){
    this.storage.get('userTemp').then((value)=>{
      if(value!=null){
        this.username=value.username;
        this.remember=value.remember;
        if(value.remember){
          this.password=value.password;
        }
      }
    })
  }

  onLogin(form:NgForm){
    let userTemp={username:form.value.username,password:form.value.password,remember:form.value.remember};
    this.storage.set('userTemp',userTemp);
    //请求获得用户数据
    this.httpServiceProvider.httpGet("tblRegistrar/login?username="+form.value.username+"&&password="+form.value.password,(data)=>{
      let temp=JSON.parse(data);
      if(temp.code!==0){
        const toast=this.toastCtrl.create({
          message:temp.msg,
          duration:1300,
          position:'top'
        })
        toast.present();
      }else {
        this.storage.set('user', temp.rows);
        this.navCtrl.popToRoot();
      }
    });
    
  }

  toRegister(){
    this.navCtrl.push(RegisterPage);
  }

  wechatLogin(){
    // const toast=this.toastCtrl.create({
    //   message:'敬请期待',
    //   duration:1300,
    //   position:'top'
    // })
    // toast.present();
    this.weChatAuth();
  }



  weChatAuth() {
    let loading = this.loadingController.create({
        content: "跳转微信登录中...",//loading框显示的内容
        dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
        showBackdrop: true  //是否显示遮罩层
    });
    loading.present();
    try {
        let scope = "snsapi_userinfo",
            state = "_" + (+new Date());
        // 1. 获取code
        Wechat.auth(scope, state, (response) => {
            var appId = "wx76af09c31724c524";
            let appSecret = "65c310d282d1a24d995de3c8e56aceb7";
            // 2. 获取token，openID
            Wechat.auth('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + response.code + '&grant_type=authorization_code', function (accessTokenResponse) {
                var accessToken = accessTokenResponse.access_token;
                var openId = accessTokenResponse.openid;
                console.log(accessTokenResponse);
                alert(accessTokenResponse)
                // 3. 获取用户信息
                Wechat.auth('https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN', function (userInfoResponse) {
                    console.log(userInfoResponse); // 用户信息
                    alert(userInfoResponse);
                    // openid    普通用户的标识，对当前开发者帐号唯一
                    // nickname    普通用户昵称
                    // sex    普通用户性别，1为男性，2为女性
                    // province    普通用户个人资料填写的省份
                    // city    普通用户个人资料填写的城市
                    // country    国家，如中国为CN
                    // headimgurl    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
                    // privilege    用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
                    // unionid    用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
                });
            });
        }, (reason) => {
            alert("Failed: " + reason);
        });
    } catch (error) {
        console.log(error);
    } finally {
        loading.dismiss();
    }

}

}
