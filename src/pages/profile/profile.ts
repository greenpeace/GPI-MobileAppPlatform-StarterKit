import {Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {FirebaseApp} from '@angular/fire';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any = {};
  file: any;
  url: any;
  key: any;
  forUpLoadRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  storageRef: any;

  constructor(public navCtrl: NavController, public af: AngularFireAuth,
              public db: AngularFireDatabase, public fs: FirebaseApp) {

    if (this.af.auth.currentUser) {
      this.key = this.af.auth.currentUser.uid;
      this.forUpLoadRef = db.list('users');
      this.userRef = db.object('/users/' + this.key);
      this.userRef.valueChanges().subscribe(val => {
        this.user.email = val.email;
        this.user.name = val.name;
        this.user.mobileNumber = val.mobileNumber;
        this.user.image = val.image;

        if (this.user.image != null) {
          this.url = val.image;
        } else {
          this.url = "assets/img/profile.jpg";
        }

      });
    }
  }

  onSubmit(user: NgForm) {
    this.userRef.update(this.user)
      .then(val => {
        this.navCtrl.push("HomePage");
      })
      .catch((error) => {
        console.log("Firebase Error " + JSON.stringify(error));
      });

  }

  UploadNewImage() {
    this.storageRef = this.fs.storage().ref();
    this.file = (<HTMLInputElement>document.getElementById('inputFileId')).files[0];
    let metadata = {
      contentType: 'image/*'
    };
    let that = this;
    this.storageRef.child('profile/' + this.file.name).put(this.file, metadata)
      .then(res => {
        this.storageRef.child('profile/' + this.file.name).getDownloadURL()
          .then(function (url) {
            that.user.image = url;
            that.url = url;
          }).catch(error => {
          console.log("FireBase Error" + JSON.stringify(error));
        });
      });
  }
}