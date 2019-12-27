import {Component} from '@angular/core';
import {NavController, NavParams, IonicPage, LoadingController,  ToastController} from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from 'ionic-angular';
import {GoogleCloudVisionServiceProvider} from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import {GoogleCloudAutoMlServiceProvider} from '../../providers/google-cloud-vision-service/google-cloud-automl-vision';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Camera]
})

export class HomePage {
  
  state = "normal";
  searchBarVisible = false;

  plastic: any= {};

  brand: any[] = [];
  trash: any[] = [];

  ts: any[] = [];
  key: any;

  date: any;

  brandsList: any[] = [];
  typeoftrashList: any[] = [];

  rubbishRef: AngularFireList<any>;
  brandsRef: AngularFireList<any>;
  typeoftrashsRef: AngularFireList<any>;
  ForUpLoadRef: AngularFireList<any>;
  UserRef: AngularFireObject<any>;
  SevenDaysBack: any;

  public base64Image: string;
  public visionresponse: string;
  public automlresponse: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public af: AngularFireAuth,
    public toastCtrl: ToastController,
    public socialSharing: SocialSharing,
    public ga: GoogleAnalytics,
    private vision: GoogleCloudVisionServiceProvider,
    private automl: GoogleCloudAutoMlServiceProvider,    
    private geolocation: Geolocation,
    private platform: Platform,
    private camera: Camera) {

      // Database to store to
      this.rubbishRef = db.list('rubbish');

      // List of the brands
      this.brandsRef = db.list('brands');
      this.brandsRef.valueChanges().subscribe(val => {
        this.brandsList = val;
      })

      // List of type of trash
      this.typeoftrashsRef = db.list('typeoftrashs');
      this.typeoftrashsRef.valueChanges().subscribe(val => {
        this.typeoftrashList = val;
      })

      // Place holder for the image
      this.base64Image = "https://placehold.it/250x250";
  }

  ngOnInit() {
    this.googleanalyticstrack();
  }

  // Save the image and details to database
  async saveImage() {

    let that = this;
    let metadata = {
      contentType: 'image/jpg'
    };
    let storageRef = firebase.storage().ref();

    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'img/todays-date.jpg'
     await storageRef.child("rubbish/" + that.plastic.typeoftrash + "/" + filename + ".jpg")
       .putString(this.base64Image, firebase.storage.StringFormat.DATA_URL, metadata)
       .then(res => {
        // get current position
        this.geolocation.getCurrentPosition().then(pos => {
          that.plastic.lat = pos.coords.latitude;
          that.plastic.long = pos.coords.longitude;
          console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude + ', timestamp: ' + pos.timestamp);
        });

        if (that.af.auth.currentUser) {
          that.key = that.af.auth.currentUser.uid;
          that.UserRef = that.db.object('/users/' + that.key);
          that.UserRef.valueChanges().subscribe(val => {
            that.plastic.user = val.name;
          });
          that.plastic.userId = that.af.auth.currentUser.uid;
        }

        // If AUTOML is used then upload image to ML Model, also check ML
        if (localStorage.getItem('automl') != null) {
           console.log("automl code");
           this.automl.predictImage(this.base64Image).subscribe((result) => {
            this.base64Image = "data:image/jpg;base64," + this.base64Image;
          
            // Get the logo details from the app
            const results = result.json().responses;
            const match = results[0].logoAnnotations;

            // check if logo exist
            if (match === undefined || match === null) {
              // prompt no data
               this.automlresponse = match;
               this.createToaster('No Type of Trash detected', 3000);
            } else {
              match.forEach(match =>
                this.automlresponse = match.description
            );
            this.createToaster('Type of trash detected: ' + this.automlresponse, 3000);
          }     
          //Add code to check if an image is what type of trash model alos add image to the model
         })
        }

        // Get Timestamp
        that.plastic.ts = Date.now();

        // Get image URL
        storageRef.child("rubbish/" + that.plastic.typeoftrash + "/" + filename + ".jpg").getDownloadURL()
        .then(function (imgUrl) {
          that.plastic.imgUrl = imgUrl;

        console.log(that.plastic);
        // if error no image do not create
        if (that.plastic.imgUrl != null) {
          that.rubbishRef.push(that.plastic).then(res => {
            that.createToaster('Data Added Successfully!', 3000);
          })
        }
      });
    }).catch(error => {
      that.createToaster('Error in Uploading!', 3000);
      console.log("FireBase Error" + JSON.stringify(error));
    });
  }

  // Take a picture details
  takePicture() {
      this.camera.getPicture({
          quality : 75,
          destinationType : this.camera.DestinationType.DATA_URL,
          sourceType : this.camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: this.camera.EncodingType.JPEG,
          targetWidth: 250,
          targetHeight: 250,
          saveToPhotoAlbum: false
      }).then(imageData => {
          this.vision.getLabels(imageData).subscribe((result) => {
              this.base64Image = "data:image/jpg;base64," + imageData;
              
              // Get the logo details from the app
              const results = result.json().responses;
              const logos = results[0].logoAnnotations;

              // check if logo exist
              if (logos === undefined || logos === null) {
                  // prompt no data
                   this.visionresponse = logos;
                   this.createToaster('No Brand detected', 3000);
              } else {
                logos.forEach(logo =>
                    this.visionresponse = logo.description
                );
                this.createToaster('Brand detected: ' + this.visionresponse, 3000);
              }

              // If brand detected in the image - use the detected brand 
              if (this.visionresponse !== undefined) {
                  //check if brand already exixst in database
                  this.db.list('brands', ref => ref
                    .orderByChild('title')
                    .equalTo(this.visionresponse))
                    .valueChanges().subscribe(data => {

                    if(data.length === 0) {
                        // Add the detected brand to the brand category list
                        this.date = Date.now();

                        this.brandsRef.push({
                          description: this.visionresponse,
                          title: this.visionresponse,
                          date: this.date,
                          color: '#551744',
                          icon: ''
                        }).then(res => this.createToaster('Brand added to list', 3000),
                                err => this.createToaster('Error adding brand!', 3000)
                        );
 
                        //Get last brand added in the db
                        this.db.list('brands', ref => ref.limitToLast(1))
                        .valueChanges().subscribe(
                          data => {
                            this.trash = data;
                          }
                        );
                        // New brand detected not in db the update rubbish
                        this.plastic.brandId = (typeof this.trash[0].$key === 'undefined') ? '' : this.trash[0].$key;
                        this.plastic.brand = (typeof this.visionresponse === 'undefined') ? '' : this.visionresponse;
                      console.log("Brand does not exist");
                      //here i will add a user
                    } else {
                        this.brand = data;
                        // Brand detected already in db - update rubbish record
                        this.plastic.brandId = (typeof this.brand[0].$key === 'undefined') ? '' : this.brand[0].$key;
                        this.plastic.brand = (typeof this.brand[0].title === 'undefined') ? '' : this.brand[0].title;
                      console.log("Users exists");
                    }
                  })
                }
          }, err => {
            console.log("ERROR"); 
          });
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  getPhotoFromAlbum() {
      this.camera.getPicture({
          quality: 50, 
          sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM, 
          destinationType: this.camera.DestinationType.FILE_URI,
          allowEdit : true,
          encodingType: this.camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          saveToPhotoAlbum: false
      }).then(imageData => {
          this.base64Image = "data:image/jpg;base64," + imageData;
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  } 

  onSelectedBrandChange(value: any) {
    let id = value.split(".");
    this.plastic.brandId = id[1];
    this.plastic.brand = id[0];
  }

  onSelectedTypeoftrashChange(value: any) {
    let id = value.split(".");
    this.plastic.typeoftrashId = id[1];
    this.plastic.typeoftrash = id[0];
  }

  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
  }

  // Create the display message
  createToaster(message, duration) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: duration
      });
      toast.present();
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
        this.ga.trackView('Take a picture');
        this.ga.trackEvent('takeapicture', 'event', 'Take a picture', 1);
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }
}