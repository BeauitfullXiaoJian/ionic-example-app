import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

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

    constructor(private modalCtrl: ModalController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserPage');
    }

    /**
     * 显示用户设置弹窗
     */
    showUserSettingModal() {
        this.modalCtrl.create('UserSettingModalPage').present();
    }

}
