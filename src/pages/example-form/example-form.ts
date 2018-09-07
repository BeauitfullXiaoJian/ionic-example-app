import { Component } from '@angular/core';
import { IonicPage, LoadingController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ExampleFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-example-form',
    templateUrl: 'example-form.html',
})
export class ExampleFormPage {

    // 表单数据
    formData = {
        realName: '小红',
        gender: 2,
        birthday: '1994-01-10',
        school: 1,
        range: 80
    };

    constructor(private loadCtrl: LoadingController, public viewCtrl: ViewController) { }

    confirmSubmit() {
        this.loadCtrl.create({ content: '数据提交中...', duration: 2000 }).present();
    }
}
