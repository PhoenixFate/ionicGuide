// import { HttpClient } from '@angular/common/http';
import { Http, Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';
/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(public http: Http, public configProvider:ConfigProvider) {
    //console.log('Hello HttpServiceProvider Provider');
  }

  httpGet(url,callback){
    let realUrl = this.configProvider.urlHead+url;
    this.http.get(realUrl).subscribe(data => {
      callback(data['_body']);
    }, err => {

    });
  }

  httpPost(){

  }

}
