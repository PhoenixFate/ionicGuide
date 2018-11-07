import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareDetailPage } from './share-detail';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

@NgModule({
  declarations: [
    ShareDetailPage,
  ],
  imports: [
    EmojiPickerModule.forRoot(),
    IonicPageModule.forChild(ShareDetailPage),
  ],
})
export class ShareDetailPageModule {}
