import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {BrowserModule} from'@angular/platform-browser';
import {HttpModule} from'@angular/http';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import {firebaseConfig} from '../config/firebase.config';
import {GoogleCloudVisionServiceProvider} from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import {GoogleCloudAutoMlServiceProvider} from '../providers/google-cloud-vision-service/google-cloud-automl-vision';
import {DialogflowProvider} from '../providers/dialogflow/dialogflow';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';

import 'firebase/storage';

import { MessagingService } from './shared/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    BrowserModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: [{
    provide: ErrorHandler, 
    useClass: IonicErrorHandler}, 
    GoogleCloudVisionServiceProvider,
    GoogleCloudAutoMlServiceProvider,
    Geolocation,
    GoogleAnalytics,
    DialogflowProvider,
    MessagingService,
    AsyncPipe
  ]
})
export class AppModule {}