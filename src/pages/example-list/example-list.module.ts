import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExampleListPage } from './example-list';

@NgModule({
  declarations: [
    ExampleListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExampleListPage),
  ],
})
export class ExampleListPageModule {}
