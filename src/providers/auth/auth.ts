import { Injectable } from '@angular/core';
import { RequestService } from '../request/request';
import { Observable } from 'rxjs';
import { GlobalService } from './global';
import { ApiData } from '../request/api-data';
import { map } from 'rxjs/operators';
import { HttpConfig } from '../../configs/http.config';
import { App } from 'ionic-angular';

@Injectable()
export class AuthService {

    user: any = {
        account: '登入账户',
        role: { roleName: '角色名称' }
    };

    constructor(
        private request: RequestService,
        private global: GlobalService,
        private app: App
    ) { }

    get loginState(): boolean {
        return <boolean>this.global.getValue('loginState', false);
    }

    set loginState(value: boolean) {
        this.global.setValue('loginState', value);
    }


    loadUserDeail() {
        this.request.url('/info')
            .subscribe(res => this.user = res.datas);
    }

    setOutAndClean() {
        this.setOut();
        this.global.cleanAllStorage();
    }

    setOut() {
        this.loginState = false;
        this.request.post('/signout', this.global.getValuesFromStorage(...HttpConfig.AUTH_HEADER_PARAMS))
            .subscribe();
        this.app.getRootNav().push('LoginPage');
    }

    setIn() {
        this.loginState = true;
    }

    checkLogin(): Observable<boolean> | boolean {
        return this.loginState || this.checkToken();
    }

    checkToken(): Observable<boolean> | boolean {
        if (!this.global.checkValuesFromStorage(...HttpConfig.AUTH_HEADER_PARAMS)) {
            this.app.getRootNav().push('LoginPage');
            return false;
        }
        const params = this.global.getValuesFromStorage(...HttpConfig.AUTH_HEADER_PARAMS);
        return this.request.withoutHeader
            .post('/managerapi/check', params, false)
            .pipe(map<ApiData, boolean>(res => {
                res.result ? (this.setIn(), this.user = res.datas) : (this.loginState = false, this.app.getRootNav().push('LoginPage'));
                return res.result;
            }));
    }
}