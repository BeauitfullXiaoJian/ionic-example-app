import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { RequestService } from '../../providers/request/request';
import { GlobalService } from '../../providers/auth/global';
import { AuthService } from '../../providers/auth/auth';

/**
 * LoginPage page.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    // 登入表单数据
    user = {
        account: 'admin',
        password: 'admin'
    };

    constructor(
        public loadingCtrl: LoadingController,
        private navCtrl: NavController,
        private request: RequestService,
        private global: GlobalService,
        private auth: AuthService,
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    /**
     * 登入方法
     */
    doLogin() {

        // 开启加载动画
        const loader = this.loadingCtrl.create({ content: "正在登入...", });
        loader.present()

        // 发送登入请求
        this.request.post('/login', this.user).subscribe({
            next: (res) => {
                const datas = res.datas;
                this.global.setValuesToStorage({
                    'ng-params-one': datas.id,
                    'ng-params-two': datas.token,
                    'ng-params-three': datas.platform,
                });
                this.auth.loadUserDeail();
                // 导航到首页
                this.navCtrl.setRoot('TabPage');
            },
            complete: () => loader.dismiss()
        });
    }

}
