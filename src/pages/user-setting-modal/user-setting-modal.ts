import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, App } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare const window: any;

/**
 * Generated class for the UserSettingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-setting-modal',
    templateUrl: 'user-setting-modal.html',
})
export class UserSettingModalPage {

    avatar: string | SafeResourceUrl = 'https://hello1024.oss-cn-beijing.aliyuncs.com/upload/goods/201808310421101174382331f7a611f0fcec856c2120ab5b88c236f3fa19.63574178.jpg';

    constructor(
        public viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private app: App,
        private domSanitizer: DomSanitizer,
    ) { }

    /**
     * 显示昵称编辑
     */
    showNickAlert() {
        const prompt = this.alertCtrl.create({
            title: '更改昵称',
            inputs: [
                {
                    name: 'title',
                    placeholder: '请输入您的新昵称',
                    value: '梦想的乡'
                },
            ],
            buttons: [
                { text: '取消', },
                {
                    text: '确认修改',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    /**
     * 显示我的二维码
     */
    showQrcode() {
        this.app.getRootNav().push('UserQrcodeModalPage');
    }

    /**
     * 请求相册权限
     */
    requestPhotpPermission() {
        window.imagePicker.requestReadPermission();
    }

    /**
     * 更新头像
     * @param file 图片文件对象
     */
    updateAvatar(file: File) {
        this.avatar = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
    }
}
