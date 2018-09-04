import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SystemSettingModalPage } from './system-setting-modal';

@NgModule({
  declarations: [
    SystemSettingModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SystemSettingModalPage),
  ],
})
export class SystemSettingModalPageModule {}
