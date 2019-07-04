import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[EmailComposer]
})
export class ContactPage {
  user: any = {};

  constructor(public navCtrl: NavController,
  	private email:EmailComposer) {
  }

  submit() {
    //console.log("user--" + JSON.stringify(this.user));
    let email = {
      to: 'tzetter@thunderbeardesign.com',
      subject: this.user.name,
      body: this.user.message,
      isHtml: true
    };
    this.email.open(email,function () {
    console.log('email view dismissed');
  });
    this.user = '';
    

  }
}
