import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '红色',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255,99,132,1)'],
            borderWidth: 1
        }, {
            label: '蓝色',
            data: [12, 19, 3, 5, 2, 3].reverse(),
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    };

    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    constructor() { }

}
