import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSettingModalPage } from './user-setting-modal';

@NgModule({
    declarations: [
        UserSettingModalPage,
    ],
    imports: [
        IonicPageModule.forChild(UserSettingModalPage),
    ],
})
export class UserSettingModalPageModule { }
