import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, IonicPage} from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {SocialSharing} from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-mypictures-detail',
  templateUrl: 'mypictures-detail.html',
  providers: [SocialSharing]
})
export class MypicturesDetailPage {

  searchBarVisible = false;
  key: string;
  mypicture: any = {};
  SelectedLitterRef: AngularFireObject<any>;

  user: any = {
    comment: ''
  }

  comments: any[] = [];
  dateTime: any;
  sevenDaysBack: any;
  uid: any;

  dbobject: AngularFireObject<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public af: AngularFireAuth,
              public db: AngularFireDatabase,
              public socialSharing: SocialSharing) {

    this.key = this.navParams.get('key');
    this.SelectedLitterRef = db.object('/rubbish/' + this.key);
    this.SelectedLitterRef.valueChanges().subscribe(val => {
      this.mypicture = val;
      if (this.af.auth.currentUser) {
        this.db.object('/rubbish/' + this.key).valueChanges().subscribe(res => {
          this.mypicture = res;
        })
      }
    })
  }

  ngOnInit() {
    this.db.list('/comments/' + this.key)
      .valueChanges().subscribe(res => {
        this.comments = res;
     })
    let date = new Date();
    let midnight = date.setUTCHours(0, 0, 0, 0);
    this.sevenDaysBack = midnight - 7 * 24 * 60 * 60 * 1000;
    this.uid = localStorage.getItem('uid');
    this.dbobject = this.db.object('/users/' + this.uid);
    this.dbobject.valueChanges().subscribe(val => {
      if (val.image) {
        this.user.image = val.image;
      }
      else {
        this.user.image = '';
      }
      this.user.name = val.name;
    })
  }

  onPostComment() {
    this.dateTime = new Date();
    if (this.af.auth.currentUser) {
      this.db.list('/comments/' + this.key).push({
        thumb: this.user.image,
        name: this.user.name,
        comment: this.user.comment,
        createdAt: Date.parse(this.dateTime)
      });
      this.user.comment = '';
    } else{
      this.createToaster('please login first to post comment', 3000);
    }
  }

  addMypicture(key) {
    console.log('added' + key);
    if (this.af.auth.currentUser) {
      this.db.object('/users/' + this.af.auth.currentUser.uid + '/mypictures/' + key).update({
        thumb: this.mypicture.thumb,
        title: this.mypicture.title,
        description: this.mypicture.description
      })
      this.createToaster('added to mypictures', 3000);
    }
    else {
      this.createToaster('please login first', 3000);
    }
  }

  removeMypicture(key) {
    console.log('removed' + key);
    if (this.af.auth.currentUser) {
      console.log('uid' + this.af.auth.currentUser.uid);
      this.db.object('/users/' + this.af.auth.currentUser.uid + '/mypictures/' + key).remove();
      this.createToaster('removed from mypictures', 3000);
    }
  }

  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  searchToggle() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  fbSharing() {
    this.socialSharing.shareViaFacebook(this.mypicture.description, null, null);
  }

  twitterSharing() {
    this.socialSharing.shareViaTwitter(this.mypicture.description, null, null);
  }

  googleSharing() {
    this.socialSharing.share(this.mypicture.description, null, null, null);
  }

  whatsAppSharing() {
    this.socialSharing.shareViaWhatsApp(this.mypicture.description, null, null);
  }
}