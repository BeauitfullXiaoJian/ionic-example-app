import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserQrcodeModalPage } from './user-qrcode-modal';

@NgModule({
  declarations: [
    UserQrcodeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserQrcodeModalPage),
  ],
})
export class UserQrcodeModalPageModule {}
