import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlasticMapPage } from './plastic-map';

@NgModule({
  declarations: [
    PlasticMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlasticMapPage),
  ],
})
export class PlasticMapPageModule {}