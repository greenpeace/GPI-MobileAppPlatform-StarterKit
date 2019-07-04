import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LandingPagePage} from './landing-page';


@NgModule({
  declarations: [
    LandingPagePage,
  ],
  imports: [
    IonicPageModule.forChild(LandingPagePage),
  ],
  exports: [
    LandingPagePage
  ]
})
export class LandingPagePageModule {
}
