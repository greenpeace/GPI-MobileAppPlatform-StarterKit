import {Component, OnInit} from '@angular/core';
import {NavController, IonicPage, AlertController} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage implements OnInit {
  registration: FormGroup;
  user: any = {
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'user'
  };
  date: any;

  constructor(public navCtrl: NavController, 
              private af: AngularFireAuth,
              public db: AngularFireDatabase,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.registration = new FormGroup({
      'fullName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'mobileNumber': new FormControl('', Validators.required)
    });
  }

  onRegistration() {
    this.date = new Date();
    this.af.auth.createUserWithEmailAndPassword(this.registration.value.email, this.registration.value.password)
      .then(user => {
//        console.log("user" + JSON.stringify(user));
        localStorage.setItem('uid', user.user.uid);
        this.db.object('/users/' + user.user.uid).update({
          name: this.registration.value.fullName,
          email: this.registration.value.email,
          mobileNumber: this.registration.value.mobileNumber,
          role: 'user',
          date: Date.parse(this.date)
        }).then(res => {
          this.navCtrl.push("HomePage");
        })
      })
      .catch((error: any) => {
        console.log("Firebase Error-" + JSON.stringify(error));
        let alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  navLogin() {
    this.navCtrl.push("LoginPage");
  }
}