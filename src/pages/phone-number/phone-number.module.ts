import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneNumberPage } from './phone-number';

@NgModule({
  declarations: [
    PhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneNumberPage),
  ],
})
export class PhoneNumberPageModule {}
