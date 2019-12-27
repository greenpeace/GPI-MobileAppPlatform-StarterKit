import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import { MessagingService } from './shared/messaging.service';

@Component({
  templateUrl: 'app.html',
  selector: 'MyApp',
  providers: [OneSignal, SocialSharing, SplashScreen, StatusBar]
})

//export class MyApp {
export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  user: any = {};
  rootPage: string;
  url: any;
  uid: any;
  pages: Array<{ title: string, component: any }>;  
  
  notification_message;

  dbobject: AngularFireObject<any>;

  constructor(public platform: Platform,
              public af: AngularFireAuth,
              public db: AngularFireDatabase,
              public oneSignal: OneSignal,
              public ga: GoogleAnalytics,
              public socialSharing: SocialSharing,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private messagingService: MessagingService) {
        this.initializeApp();
       }

ngOnInit() {

  this.googleanalyticsstart();

  let uid = localStorage.getItem('uid');
//  console.log("UID: " + uid);

  this.messagingService.requestPermission(uid);
  this.messagingService.receiveMessage();
  this.notification_message = this.messagingService.currentMessage;

  if (uid != null) {
    this.rootPage = "HomePage";  
    this.dbobject = this.db.object('/users/' + uid);
    this.dbobject.valueChanges().subscribe(val => {
      this.user.image = val.image;
      if (val.image != null) {
        this.url = this.user.image;
      } else {
        this.url = "assets/img/profile.jpg";
      }
    })
  } else {
    this.rootPage = "LandingPagePage";
    this.url = "assets/img/profile.jpg";
  }
}

initializeApp()
{
  this.platform.ready().then((res) => {
    if (res == 'cordova') {
      this.oneSignal.startInit('', '');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      });
      this.oneSignal.handleNotificationOpened().subscribe((res) => {

      });
      this.oneSignal.endInit();
    }
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
}

/**
 * --------------------------------------------------------------
 * Initiate Google Analytics
 * --------------------------------------------------------------
 */
googleanalyticsstart() {
  this.ga.startTrackerWithId('UA-67462967-9')
    .then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('App Start');
      this.ga.setAppVersion('0.1');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
}

openPage(page)
{
  this.nav.setRoot(page.component);
}

home()
{
  this.nav.setRoot("HomePage");
}

mypictures()
{
  this.nav.setRoot("MypicturesPage");
}

profile()
{
  this.nav.setRoot("ProfilePage");
}

setting()
{
  this.nav.setRoot("SettingPage");
}

plasticmap()
{
  this.nav.setRoot("PlasticMapPage");
}

contact()
{
  this.nav.setRoot("ContactPage");
}

chatwithus()
{
  this.nav.setRoot("ChatwithusPage");
}

message()
{
  this.nav.setRoot("MessagePage");
}

invite()
{
  this.socialSharing.share("share Cleanup App with friends", null, null, 'https://torbjornzetterlund.com');
}

login()
{
  this.nav.setRoot("LoginPage");
}

logout()
{
  this.af.auth.signOut();
  localStorage.removeItem('uid');
  this.url = "assets/img/profile.jpg";
  this.nav.setRoot("LandingPagePage");
}

isLoggedin()
{
  return localStorage.getItem('uid') != null;
}
}