import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SystemSettingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-system-setting-modal',
    templateUrl: 'system-setting-modal.html',
})
export class SystemSettingModalPage {

    soundType = '跟随系统';

    constructor(
        public viewCtrl: ViewController,
        private alerCtrl: AlertController,
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SystemSettingModalPage');
    }

    showAlertRadio() {

        const alert = this.alerCtrl.create();
        const radios = ['跟随系统', '登场', '铁皮鼓', '加血', '发送邮件', 'DJ'];
        alert.setTitle('选择声音');
        radios.forEach(radio => {
            alert.addInput({
                type: 'radio',
                label: radio,
                value: radio,
                checked: this.soundType === radio
            });
        });
        alert.addButton('取消');
        alert.addButton({
            text: '确认',
            handler: data => {
                this.soundType = data;
            }
        });
        alert.present();
    }

}
