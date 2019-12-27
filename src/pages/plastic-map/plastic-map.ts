/**
 * @author    ThunderBear Design <tzetter@thunderbeardesign.com>
 * @copyright Copyright (c) 2018
 * @license   mamb50
 * 
 * This file represents a component of Friends Location Map
 * File path - '../../../src/pages/friends-location-map/friends-location-map'
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { AngularFireDatabase,  AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-plastic-map',
  templateUrl: 'plastic-map.html',
})
export class PlasticMapPage {

  /**
   * Contains Map Elements
   */
  map: any;

  // Infowindows
  infoWindows: any;

  /**
   * Location Latitude and Longitude
   */
  _latLng: any;

  /**
   * Map Options
   */
  mapOptions: any;

  /**
   * Map Data from database
   */
  mapdata: any[] = [];

  markers: any[];

  myPicturesRef: AngularFireList<any>;

  // The GPS Coordinates
  lat: any;
  long: any;

  /**
   * Map Element
   */
  @ViewChild('map') mapElement: ElementRef;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public ga: GoogleAnalytics,
    private geolocation: Geolocation,
    public af: AngularFireAuth,
    public db: AngularFireDatabase) {

    this.infoWindows = [];

  }

  /** Do Any Initialization */
  ngOnInit() {
    this.googleanalyticstrack();
    this.initMap();
  }

  /**
  /**
   * --------------------------------------------------------------
   * Init Map
   * --------------------------------------------------------------
   * @method initMap
   * This function check current user location point is exist or not. If location is not exist
   * then retrieve user current location information otherwise call friend location data with user map.
   */
  initMap() {
    if (this.af.auth.currentUser) {
      // Find specific records of a user 
      this.db.list('rubbish', ref => ref
        .orderByChild('userId')
        .equalTo(this.af.auth.currentUser.uid))
        .valueChanges().subscribe(
        data => {
          this.mapdata = data;
//          console.log("Map Data", this.mapdata)
          this.loadMap();
        }
      );
    }
  }

  /**
   * --------------------------------------------------------------
   * Load Map
   * --------------------------------------------------------------
   * @method loadMap
   */
  async loadMap() {
        console.log("Load Map");
      // get current position
     await this.geolocation.getCurrentPosition().then(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
      });

    this.mapOptions = {
      center: new google.maps.LatLng( this.lat, this.long),
      zoom: 8,
      duration: 5000,
      mapTypeControl: false,
      navigationControl: true,
      bearing: 50,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
    this.createMarker();
  }

  /**
  * --------------------------------------------------------------
  * Google Analytics
  * --------------------------------------------------------------
  */
  googleanalyticstrack() {
    this.ga.startTrackerWithId('UA-67462967-9')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Map');
        this.ga.trackEvent('map', 'event', 'Map', 1);
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  /**
   * --------------------------------------------------------------
   * Marker Create
   * --------------------------------------------------------------
   * @method createMarker
   * Function for adding a marker to the page.
   */
  createMarker() {
//    console.log("Create Marker");
    if (this.mapdata) {

      for (let i = 0; i < this.mapdata.length; i++) {

        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(this.mapdata[i].lat, this.mapdata[i].long),
          icon: {
            url: this.mapdata[i].imgUrl,
            scaledSize: new google.maps.Size(40, 40)
          }
        });
        let content = "<h4>Details</h4><p>" + 
                    this.mapdata[i].user + 
                    "<br>Brand: " + 
                    this.mapdata[i].brand +
                    "</p>";         
       
        this.addInfoWindow(marker, content);
      }
    }
  }

  // Info Window
  addInfoWindow(marker, content){
//    console.log("Details", content)
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      this.closeAllInfoWindows();
      infoWindow.setContent(content);
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  // Close All Info Windows
  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  /**
   * --------------------------------------------------------------
   * Refresh Map
   * --------------------------------------------------------------
   * @method refreshMap
   */
  refreshPage() {
    this.navCtrl.setRoot('FriendsLocationMapPage');
  }
}