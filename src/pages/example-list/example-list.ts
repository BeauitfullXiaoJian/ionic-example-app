import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { RequestService } from '../../providers/request/request';
import { Pagination } from '../../classes/page.class';

/**
 * Generated class for the ExampleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-example-list',
    templateUrl: 'example-list.html',
})
export class ExampleListPage {

    page = new Pagination();

    listDatas = new Array<any>();

    constructor(
        public viewCtrl: ViewController,
        private request: RequestService,
    ) { }

    ionViewDidLoad() {
        this.loadDatas();
    }

    loadDatas(complete = new Function(), reset = false) {
        this.request.get('/list', this.page.params()).subscribe({
            next: (res) => {
                reset && (this.page.reset(), this.listDatas = []);
                this.page.total = res.datas.total;
                this.listDatas.push(...res.datas.rows);
            },
            complete: () => (this.page.loading = false, complete())
        });
    }

    doRefresh(refresher) {
        this.loadDatas(() => refresher.complete(), true)
    }


    doInfinite(infiniteScroll) {
        if ((!this.page.loading) && this.page.hasNext()) {
            this.page.currentPage++;
            this.page.loading = true;
            this.loadDatas(() => infiniteScroll.complete());
        }
    }
}
