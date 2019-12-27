import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import { map } from 'rxjs/operators/map';

@IonicPage()
@Component({
  selector: 'page-mypictures',
  templateUrl: 'mypictures.html',
})

export class MypicturesPage {
  mypictures: any[] = [];

  myPicturesRef: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public ga: GoogleAnalytics,
              public af: AngularFireAuth,
              public db: AngularFireDatabase) {

    this.googleanalyticstrack();

    if (this.af.auth.currentUser) {
      // Find specific records of a user 

      this.myPicturesRef = db.list('/rubbish', ref => ref
          .orderByChild('userId')
          .equalTo(this.af.auth.currentUser.uid));

      this.myPicturesRef
        .snapshotChanges().subscribe((res) => {
        this.mypictures = res.map(change => ({key: change.payload.key, ...change.payload.val()}));
     });
    }
  }

  /**
  * --------------------------------------------------------------
  * Google Analytics
  * --------------------------------------------------------------
  */
  googleanalyticstrack() {
    this.ga.startTrackerWithId('UA-67462967-9')
      .then(() => {
//        console.log('Google analytics is ready now');
        this.ga.trackView('My picture');
        this.ga.trackEvent('My picture', 'event', 'My Picture', 1);
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  isMypictures(): boolean {
    if (this.mypictures.length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

  litterDetails(key) {
    console.log("key for the image:" + key);
    this.navCtrl.push("MypicturesDetailPage", {
      key: key
    })
  }

  removeMypicture(key) {
    if (this.af.auth.currentUser) {
//      console.log('uid' + this.af.auth.currentUser.uid);
      this.db.object('/rubbish/' + key).remove();

//      let storageRef = firebase.storage().ref();
      // Create a reference to the file to delete
//      let desertRef = storageRef.child(`rubbish/${this.mypictures}.jpg`);

      // Delete the file
//      desertRef.delete().then(function() {
        this.createToaster('file and record removed', 3000);
//      }).catch(function(error) {
//        this.createToaster('could not delete file', 3000);
//      });
    }
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}