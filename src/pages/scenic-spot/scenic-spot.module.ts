import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScenicSpotPage } from './scenic-spot';

@NgModule({
  declarations: [
    ScenicSpotPage,
  ],
  imports: [
    IonicPageModule.forChild(ScenicSpotPage),
  ],
})
export class ScenicSpotPageModule {}
