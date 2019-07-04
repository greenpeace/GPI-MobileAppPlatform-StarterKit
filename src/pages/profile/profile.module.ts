import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilePage} from './profile';
import {FileUploadModule} from 'ng2-file-upload';
import 'firebase/storage';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    FileUploadModule
  ],
  exports: [
    ProfilePage
  ]
})
export class ProfilePageModule {
}
