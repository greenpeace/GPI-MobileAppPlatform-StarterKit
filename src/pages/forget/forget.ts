import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }

}
