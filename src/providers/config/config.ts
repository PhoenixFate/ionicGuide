// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  public imgHead:string='https://njrzzk.com';
  public urlHead:string='https://njrzzk.com/app/a/app/';
  constructor() {
    //console.log('Hello ConfigProvider Provider');
  }

}
