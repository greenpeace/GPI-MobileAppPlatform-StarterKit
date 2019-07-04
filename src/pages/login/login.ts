import {Component, OnInit} from '@angular/core';
import {NavController, IonicPage, Platform, LoadingController, AlertController} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Facebook} from "ng2-cordova-oauth/core";
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {TwitterConnect} from '@ionic-native/twitter-connect';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [TwitterConnect]
})
export class LoginPage implements OnInit {

  private oauth: OauthCordova = new OauthCordova();
  private facebookProvider: Facebook = new Facebook({
    clientId: "1467938196586389",
    appScope: ["email"]
  })

  login: FormGroup;

  constructor(public navCtrl: NavController,
              private af: AngularFireAuth,
              public db: AngularFireDatabase,
              public platform: Platform,
              public twitter: TwitterConnect,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.login = new FormGroup({
      'email': new FormControl('xxxxx@xxxxxxx.xxx', Validators.required),
      'password': new FormControl('xxxxxx', Validators.required)
    });
  }

//
// Login
//
  onLogin() {
    this.af.auth.signInWithEmailAndPassword(
      this.login.value.email,
      this.login.value.password
    )
    .then(user => {
//       console.log("success" + JSON.stringify(user));
        localStorage.setItem('uid', user.user.uid);
        this.navCtrl.push("HomePage");
      })
      .catch((error: any) => {
        let alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }

//
// Twitter Login
//
  twitterLogin() {
    this.platform.ready().then((res) => {
        if (res == 'cordova') {
          this.twitter.login().then((result) => {
            this.twitter.showUser().then((user) => {
                console.log("user--" + JSON.stringify(user));
                let loading = this.loadingCtrl.create({
                  content: 'Login Please Wait...'
                });
                loading.present();

                var provider = firebase.auth.TwitterAuthProvider.credential(result.token, result.secret);

                firebase.auth().signInWithCredential(provider)
                  .then((response) => {
                    this.db.object('/users/' + response.uid).update({
                      name: response.displayName,
                      email: response.email,
                      role: 'User'
                    });
                    localStorage.setItem('uid', response.uid);
                    loading.dismiss();
                    this.navCtrl.push("HomePage");
                  })
                  .catch((error) => {
                  });
              },
              (onError) => {
                console.log("Error" + JSON.stringify(onError));
              }
            )
          })
        }
      }
    )
  }

//
// FaceBook Login
//
  onFacebookLogin() {
    this.oauth.logInVia(this.facebookProvider).then((success) => {
      console.log("RESULT: " + JSON.stringify(success));
      let res: any = success;
      console.log("token-" + JSON.stringify(res.access_token));
      var provider: any = firebase.auth.FacebookAuthProvider.credential(res.access_token);

      firebase.auth().signInWithCredential(provider)
        .then((response) => {
          console.log("Firebase -fb success: " + JSON.stringify(response));
          this.db.object('/users/' + response.uid).update({
            name: response.displayName,
            email: response.email,
            role: 'User'
          });
          localStorage.setItem('uid', response.uid);
          this.navCtrl.push("HomePage");
        })
        .catch((error) => {
          console.log("Firebase failure:--- " + JSON.stringify(error));
        });
    }, error => {
      console.log("FACEBOOK_ERROR: ", error);
    });
  }

  navRegister() {
    this.navCtrl.push("RegistrationPage");
  }

  forget() {
    this.navCtrl.push("ForgetPage");
  }
}