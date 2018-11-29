import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServiceProvider } from '../../providers/http-service/http-service';
/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
  public messageId;
  public messageDetails;
  public msgHTML;
  public msgTitle;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServiceProvider:HttpServiceProvider) {
    this.messageId=navParams.get('messageId');
    this.getMessageDetail();
  }

  getMessageDetail(){
    this.httpServiceProvider.httpGet('tblSysMessage/getDetail?messaageId='+this.messageId,(data)=>{
      let temp=JSON.parse(data);
      this.messageDetails=temp.rows;
      this.msgHTML=temp.rows.contentForApp;
      this.msgTitle=temp.rows.title;
      console.log(this.messageDetails);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }

}
