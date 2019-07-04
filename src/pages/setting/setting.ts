/**
 * @author    ThunderBear Design <tzetter@thunderbeardesign.com>
 * @copyright Copyright (c) 2018
 * @license   mamb50
 * 
 * This file represents a component of settings page
 * File path - '../../../src/pages/settings/settings'
 */
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

	automl: any;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.automl = localStorage.getItem('automl');
  }

  changeSetting() {
    //console.log('--'+this.automl);
    localStorage.setItem('automl', this.automl)
  }
}