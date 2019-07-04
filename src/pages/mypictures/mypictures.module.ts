import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MypicturesPage} from './mypictures';

@NgModule({
  declarations: [
    MypicturesPage,
  ],
  imports: [
    IonicPageModule.forChild(MypicturesPage),
  ],
  exports: [
    MypicturesPage
  ]
})
export class MypicturesPageModule {
}
