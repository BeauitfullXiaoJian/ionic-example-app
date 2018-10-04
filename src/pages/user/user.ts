import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
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

    constructor(
        private auth: AuthService,
        private app: App
        ) { }

    /**
     * 显示用户设置页面
     */
    showUserSettingModal() {
        this.app.getRootNav().push('UserSettingModalPage');
    }

    /**
     * 显示系统设置页面
     */
    showSystemSettingModal() {
        this.app.getRootNav().push('SystemSettingModalPage');
    }

}
