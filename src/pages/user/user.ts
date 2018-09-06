import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {

    get user(): any {
        return this.auth.user || {};
    }

    constructor(private modalCtrl: ModalController, private auth: AuthService) { }

    /**
     * 显示用户设置弹窗
     */
    showUserSettingModal() {
        this.modalCtrl.create('UserSettingModalPage').present();
    }

    /**
     * 显示系统设置弹窗
     */
    showSystemSettingModal() {
        this.modalCtrl.create('SystemSettingModalPage').present();
    }

}
