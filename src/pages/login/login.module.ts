import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RequestService } from '../../providers/request/request';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
    ],
    providers: [
        RequestService
    ]
})
export class LoginPageModule { }
