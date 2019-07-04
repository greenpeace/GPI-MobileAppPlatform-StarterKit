import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-landing-page',
  templateUrl: 'landing-page.html'
})
export class LandingPagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navLogin() {
    this.navCtrl.push("LoginPage");
  }

  navSignin() {
    this.navCtrl.push("RegistrationPage");
  }

  gotoHome() {
    this.navCtrl.push("HomePage");
  }
}
