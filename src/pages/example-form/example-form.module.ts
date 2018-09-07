import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExampleFormPage } from './example-form';

@NgModule({
  declarations: [
    ExampleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ExampleFormPage),
  ],
})
export class ExampleFormPageModule {}
