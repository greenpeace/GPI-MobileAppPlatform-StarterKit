import {NgModule} from '@angular/core';
import {IonicPageModule, IonicModule} from 'ionic-angular';
import { ChatwithusPage } from './chatwithus';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChatwithusPage
  ],
  imports: [
    ComponentsModule,  
    IonicPageModule.forChild(ChatwithusPage)
  ],
  exports: [
    ChatwithusPage
  ]
})
export class ChatwithusPageModule {

}