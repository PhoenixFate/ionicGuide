import { MessageDetailsPage } from './../message-details/message-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../../providers/config/config';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  public user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
  public page=1;
  public messageList=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public configProvider:ConfigProvider,
    public httpServiceProvider:HttpServiceProvider) {
  }

  ionViewDidEnter() {
    this.storage.get('user').then((value) => {
      if (value == null) {
        this.user = { username: '', phone: '', image: '', id: '', sex: '', nickname: '' };
      } else {
        this.user = value;
        this.getMessage();
      }
    })
  }

  getMessage(){
    this.httpServiceProvider.httpGet('tblSysMessageRecord/getPagelist?pageNum='+this.page+'&regId='+this.user.id,(data)=>{
      let temp=JSON.parse(data).rows;
      for(let i=0;i<temp.length;i++){
        let arr = temp[i].tblSysMessage.image.split('|');
        arr.shift();
        temp[i].tblSysMessage.image=arr[0];
      }
      this.messageList=temp;
      console.log(this.messageList);
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MessagePage');
  }

  toDetailsPage(i){
    this.navCtrl.push(MessageDetailsPage,{index:i,messageId:this.messageList[i].tblSysMessage.id});
  }

}
