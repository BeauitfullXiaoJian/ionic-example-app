import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { RequestService } from '../providers/request/request';
import { RequestInterceptor } from '../providers/request/request.interceptor';
import { ResponseInterceptor } from '../providers/request/response.interceptor';
import { GlobalService } from '../providers/auth/global';
import { AuthService } from '../providers/auth/auth';

@NgModule({
    declarations: [MyApp],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    providers: [
        StatusBar,
        SplashScreen,
        RequestService,
        GlobalService,
        AuthService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    ]
})
export class AppModule { }
