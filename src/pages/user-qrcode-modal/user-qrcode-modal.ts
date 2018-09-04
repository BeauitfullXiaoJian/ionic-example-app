import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { RequestService } from '../../providers/request/request';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserQrcodeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-qrcode-modal',
    templateUrl: 'user-qrcode-modal.html',
})
export class UserQrcodeModalPage {

    src: SafeResourceUrl;

    constructor(
        private request: RequestService,
        private domSanitizer: DomSanitizer,
        public viewCtrl: ViewController,
    ) { }

    ionViewDidLoad() {
        Observable.combineLatest(
            this.request.text('/avatar'),
            this.request.text('/qrcode')
        ).subscribe((datas: string[]) => {
            this.initQrcodeCanvas(datas[0], datas[1]);
        });
    }


    initQrcodeCanvas(avatar: string, image: string) {
        const canvas = document.createElement('canvas');
        const avatarImg = new Image();
        const qrcodeImg = new Image();
        const ctx = canvas.getContext('2d');
        const avatarLoader = Observable.fromEventPattern((handle => { avatarImg.onload = () => handle() }));
        const qrcodeLoader = Observable.fromEventPattern((handle => { qrcodeImg.onload = () => handle() }));
        avatarImg.src = avatar;
        qrcodeImg.src = image;
        Observable.combineLatest(avatarLoader, qrcodeLoader).subscribe(() => {
            // 二维码作为背景图
            canvas.width = qrcodeImg.naturalWidth;
            canvas.height = qrcodeImg.naturalHeight;
            ctx.drawImage(qrcodeImg, 0, 0);

            // 绘制头像居中
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'white';
            ctx.arc(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.15, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(avatarImg, canvas.width * 0.35, canvas.height * 0.35, canvas.width * 0.3, canvas.height * 0.3);
            this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(canvas.toDataURL("image/jpg"));
        });
    }
}
