import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ChartModule } from '../../components/chart/chart.module';

@NgModule({
    declarations: [
        DashboardPage,
    ],
    imports: [
        ChartModule,
        IonicPageModule.forChild(DashboardPage),
    ],
})
export class DashboardPageModule { }
