import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NicknamePage } from './nickname';

@NgModule({
  declarations: [
    NicknamePage,
  ],
  imports: [
    IonicPageModule.forChild(NicknamePage),
  ],
})
export class NicknamePageModule {}
