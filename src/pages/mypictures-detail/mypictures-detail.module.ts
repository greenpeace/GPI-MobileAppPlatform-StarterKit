import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MypicturesDetailPage} from './mypictures-detail';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    MypicturesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MypicturesDetailPage),
    MomentModule
  ],
  exports: [
    MypicturesDetailPage
  ]
})
export class MypicturesDetailPageModule {
}
