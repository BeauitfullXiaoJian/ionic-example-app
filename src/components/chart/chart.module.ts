import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDirective } from './chart.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ChartDirective,
    ],
    exports: [
        CommonModule,
        ChartDirective,
    ]
})
export class ChartModule { }
