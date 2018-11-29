// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { File, FileEntry } from '@ionic-native/file';
import { Http, Headers } from '@angular/http';
import { ConfigProvider } from '../config/config';
import { Observable } from 'rxjs/Observable';
import { ForkJoinObservable } from 'rxjs/observable/ForkJoinObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the UploadImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadImageProvider {
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public formData;

  constructor(  
    private camera: Camera,
    private transfer:FileTransfer,
    public configProvider:ConfigProvider,
    private http: Http,
    private imagePicker: ImagePicker,
    private file: File) {
    
  }

  doCamera(userId,url,callback){
    const options:CameraOptions={
      quality:50,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,
      allowEdit:true,
      targetHeight:300,
      targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData)=>{
        this.doUpload(ImageData,userId,url,callback);
    },(err)=>{

    })
  }

  doCamera2(userId,url,callback){
    const options:CameraOptions={
      quality:50,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,
      correctOrientation:true,
      //allowEdit:true,
      //targetHeight:300,
      //targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData)=>{
        this.doUpload2(ImageData,userId,url,callback);
    },(err)=>{

    })
  }


  //调用相册（单张图片）
  doLibraryOneImage(userId,url,callback){
    const options:CameraOptions={
      quality:50,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,
      targetHeight:300,
      targetWidth:300,
    }
    this.camera.getPicture(options).then((ImageData)=>{
        this.doUpload(ImageData,userId,url,callback);
    },(err)=>{

    })
  }

  //单张图片上传
  doUpload(src,userId,url,callback) {
    let timestamp=new Date().getTime();
    const FileTransfer:FileTransferObject=this.transfer.create();
    let options:FileUploadOptions= {
      fileKey:'file',
      fileName:timestamp+'.jpg',
      mimeType:'image/jpeg',
      httpMethod:"POST",
      params:{
        id:userId
      }
    }
    var api=this.configProvider.urlHead+url;
    FileTransfer.upload(src,encodeURI(api),options).then((data)=>{
      let temp = JSON.parse(data['response']);
      callback(temp);
    },(err)=>{
      
    })
  }

  //单张图片上传(后端接口不统一)
  doUpload2(src,userId,url,callback) {
    let timestamp=new Date().getTime();
    const FileTransfer:FileTransferObject=this.transfer.create();
    let options:FileUploadOptions= {
      fileKey:'myfiles',
      fileName:timestamp+'.jpg',
      mimeType:'image/jpeg',
      httpMethod:"POST",
      params:{
        id:userId
      }
    }
    var api=this.configProvider.urlHead+url;
    FileTransfer.upload(src,encodeURI(api),options).then((data)=>{
      let temp = JSON.parse(data['response']);
      callback(temp);
    },(err)=>{
      
    })
  }

  //从相册中选择多张照片
  doLibraryManyImages(length,userId,callback) {
    const options: ImagePickerOptions = {
      maximumImagesCount: 9 - length,
      quality: 50
    }
    this.imagePicker.getPictures(options).then((results) => {
      this.doImagesUpload(results,userId,callback);
    }, (err) => {

    });
  }

   //从相册中选择多张照片
   doLibraryManyImages2(callback) {
    const options: ImagePickerOptions = {
      maximumImagesCount: 9,
      quality: 50
    }
    this.imagePicker.getPictures(options).then((results) => {
      callback(results);
    }, (err) => {

    });
  }


  //多张图片上传入口
  doImagesUpload(images,userId,callback) {
    let host = 'https://njrzzk.com/app/a/app/tblPicTextShare/uploadImages';
    let params = new Map();
    params.set('id', userId);
    this.doImagesUploadFile(host, params, images, self, res => {
      let temp = JSON.parse(res['_body']);
      callback(temp);
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  doImagesUploadFile(host: string, params: Map<string, string>, filePaths: Array<string>, context: any, success: Function, fail: Function) {
    this.formData = new FormData();
    this.ImagesUpload(filePaths).subscribe(data => {
      params.forEach((value, key) => {
        this.formData.append(key, value);
      });
      this.http.post(host, this.formData).toPromise().then(res => {
        success.call(context, res);
      }).catch(error => {
        fail.call(context, error);
      });
    }, error => {
      console.log('文件处理失败');
    });
  }

  private ImagesUpload(filePaths: Array<string>): Observable<any> {
    //每个文件上传任务创建一个信号
    var observables: Array<any> = [];
    filePaths.forEach((value: string, i, array) => {
      if (!value.startsWith('file://')) {
        value = 'file://' + value;
      }
      var observable = new Observable((sub: any) => {
        this.file.resolveLocalFilesystemUrl(value).then(entry => {
          (<FileEntry>entry).file(file => {
            let blob: Blob = <Blob>file;
            const reader = new FileReader();
            let timestamp = new Date().getTime();
            reader.onloadend = () => {
              const imgBlob = new Blob([reader.result], { type: blob.type });
              this.formData.append('myfiles', imgBlob, timestamp + 'multy.jpg');
              sub.next(null);
              sub.complete();
            };
            reader.readAsArrayBuffer(blob);
          });
        }).catch(error => console.log('报错了，日了狗----->' + JSON.stringify(error)));
      });
      observables.push(observable);
    });
    return ForkJoinObservable.create(observables);
  }


}
