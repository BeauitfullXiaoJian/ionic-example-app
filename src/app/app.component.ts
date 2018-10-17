import { Component, OnInit } from '@angular/core';
import { Platform, IonicApp, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth/auth';
declare const window: any;

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {

    rootPage: any = 'TabPage';

    backButtonPressed = false;

    constructor(
        private platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        ionicApp: IonicApp,
        app: App,
        private toastCtrl: ToastController,
        private auth: AuthService
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            // 注册返回事件
            platform.registerBackButtonAction(() => {
                let activePortal = ionicApp._modalPortal.getActive();
                if (activePortal) {
                    activePortal.dismiss().catch(() => { });
                    activePortal.onDidDismiss(() => { });
                    return;
                }
                let activeNav = app.getRootNav();
                return activeNav.canGoBack() ? activeNav.pop() : this.showExit();
            }, 1);
            // 尝试获取地理位置
            // this.getLocation();
        });
    }

    /**
     * 双击退出提示框
     */
    showExit() {
        if (this.backButtonPressed) {
            this.platform.exitApp();
        } else {
            this.toastCtrl.create({
                message: '再按一次退出应用',
                duration: 1000,
            }).present();
            this.backButtonPressed = true;
            setTimeout(() => this.backButtonPressed = false, 2000);
        }
    }

    /**
     * 获取地理定位信息
     */
    getLocation() {
        setInterval(() => {
            window.AMap.getMyLocation(
                success => {
                    alert(JSON.stringify(success));
                },
                error => {
                    alert(error);
                }
            );
        }, 1000);
    }

    /**
     * 应用全局初始化操作
     */
    ngOnInit() {
        // 载入用户信息
        this.auth.loadUserDeail();
    }
}

