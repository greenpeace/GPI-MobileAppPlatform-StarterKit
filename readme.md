# GPI Mobile App Platform StarterKit

This is a startekit for creating mobile apps using the Firebase Servies as a backend and other Google CLoud Platform services.

The App out of the StarterKit comes with signup/login using FIrebase Authenitcation. Social sharing built into the app, the app comes with a function to take a picture, using the Vision API detect the brand of the item in a picture and save the picture to Firebase storage.

The user can also see all pictures they taken, and also see on a google map the location were they took the picture.

There is a BOT function that connects to the Dialogflow backend, this feature can be used to guide users on how to use the app, or if the mobile app is used to run a campaign, the bot can be used to have facts about the campaign etc. In the Dialogflow backend, the users can build up flows of dialogs.

## What is GPI Mobile App Platform StarterKit
GPI Mobile App Platform StarterKit is a modular repetable plaform and is build on the following components

- Ionic
- Angular
- Cordova PhoneGap
- Firebase
- Typescript

## Prerequisites
1. You must have JavaScript knowledge and be familiar with AngularJS, Ionicframework and Firebase.

2. Make sure you have installed node.js 8.X and npm 5.X. You can check it in your terminal window simply by entering node  -v and npm -v .

3. Install latest ionic 3 version and Cordova 6.X . You can check ionic version in terminal with ionic -v  command. If you need more info how to setup ionic project please follow “ionic Getting started” - http://ionicframework.com/getting-started/.

4. Depending on the mobile platform you are building for IOS, Android and Windows, you would need the development platform installed to be bale build for that platform.

5. Change the details in the config.xml file

## Built on version
    $ ionic info

Ionic:

   Ionic CLI          : 5.4.2 (/usr/local/lib/node_modules/ionic)
   Ionic Framework    : ionic-angular 3.9.2
   @ionic/app-scripts : 3.2.1

Cordova:

   Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
   Cordova Platforms : android 8.1.0
   Cordova Plugins   : cordova-plugin-ionic 3.1.3, (and 18 other plugins)

Utility:

   cordova-res : not installed
   native-run  : 0.2.7 (update available: 0.2.8)

System:

   NodeJS : v8.10.0 (/usr/local/bin/node)
   npm    : 6.12.0
   OS     : macOS Catalina

## Version Checking and upgrades

Check cordova versions 

  $ npm view cordova versions

Install cordova version

  $ npm install -g cordova@6.5.0

Check what is installed 

  $ ionic info

Ionic:

   Ionic CLI          : 5.2.1 (/usr/local/lib/node_modules/ionic)
   Ionic Framework    : ionic-angular 3.9.2
   @ionic/app-scripts : 3.2.1

Cordova:

   Cordova CLI       : 6.5.0
   Cordova Platforms : android 6.2.0, ios 4.5.4
   Cordova Plugins   : cordova-plugin-ionic 3.1.3, (and 21 other plugins)

Utility:

   cordova-res : not installed
   native-run  : 0.2.7 

System:

   NodeJS : v10.15.1 (/usr/local/bin/node)
   npm    : 6.9.2
   OS     : macOS Mojave

## Android built 

Install Android version 
  $ cordova platform add android@6.2.0


If problem with the gradle version see this - https://github.com/ionic-team/ionic-cli/issues/2835

Run this command 
  $ sudo chmod 777 “/Applications/Android Studio.app/Contents/gradle/gradle-5.1.1/bin/gradle”

Your gradle version could be different so please check 

## Debug with VS Code

Add to launch.json

        { "name": "Launch in Chrome",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:8100",
            "sourceMaps": true,
            "webRoot": "${workspaceRoot}/www"    
        }

Start the ionic app from command line
  $ ionic serve -b

Cmd + F5 to launch in chrome or click start arrow in debug mode inside vs code


## config.xml

There are a few parts in the config.xml that you would need to change

The app name is define in the top of the config-example.xml file

<widget id="com.gp.cleanup" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">

Your should change the id to the name of your app.

Accordingly you would change the following 

    <name>Cleanup App</name>
    <description>Record cleanup app</description>
    <author email="<your name>" href="<your organization"><your-organization></author>

Add your TwitterConsumerKey and TwitterConsumerSecret
Add your Google Maps API Key

rename the file config-example.xml to config.xml

rename the file package-example.json to package.json

## Run in Web bowser

Open the Terminal window and navigate to the project folder and install NodeJS dependencies : 

    $ npm install     

Once the dependencies are installed you can run the app in a browser window with : 

    $ ionic serve 

You can also run this app with Ionic Lab, which allow you to run the app in a browser window simulating different modile devices.

    $ionic serve --lab

## App Structure

The app is using SASS, which is CSS. Each app component has its dedicated SASS files, structured with independent variables for maximum modularity, flexibility and customizability.

There are three main folder structures in an Ionic 3 app.

App: this is the entry point of the app and the main structure of the app.

Pages: this is the area were all the apps page are defined and consist of html, js and css resides.

Theme: this folder contains the SASS details (variables, shared styles, etc).

Assets: in this folder you will find images, and any other asset you may require for your app.


## TypeScript

In Ionic3 you don't need to worry about .js as you know it's written in TypeScript. 

Ionic 3 automatically compile all the .ts files into .js and run apps from www > build directory . 

## Themes

Here you will find all the variables, shared styles, etc. sass, in a superset of css.
 
variables.scss
This is the predefined ionic file where you should include all the css variables you may use in your app.

## Config

There are some config details that you have to create and update for your app to work.

The folder scr > config -> googlecloud.example.api.ts

Rename googlecloud.example.api.ts to googlecloud.api.ts

If you using the cloud vision api - you need to enbale the cloud vision API in your Google Compute Platform Project. - https://cloud.google.com/vision/docs/before-you-begin

The folder scr > config -> firebase.example.config.ts

Rename firebase.example.config.ts to firebase.config.ts

You need to set the firebase config data to make this app working, follow these instructions. https://support.google.com/firebase/answer/7015592?hl=en

## Run In Emulator
To setup SDK on MAC follow this https://ionicframework.com/docs/v2/resources/platform-setup/mac-setup.html or

if you are window user please follow this https://ionicframework.com/docs/v2/resources/platform-setup/windows-setup.html .

All the following command work with IONIC CLI V3 so if you still using older cli please update ionic with npm install -g cordova ionic .  

You also need to install Gradle before make native build.   

Run your app in IOS emulator

     $ ionic cordova platform add  ios

     $ ionic cordova run ios   

Run your app in Android emulator

    $ ionic cordova platform add android

    $ ionic cordova run android  

## Restoring
You may sometime need to restore your setup

    $ ionic cordova prepare android

## To clean your installation

    $ cordova clean android

## To remove and add back a platform
From time to time you may run into version issues, espcially after an upgrade

    $ cordova platforms remove android
    $ cordova platforms add android

## List Cordova instal plugins

    $  cordova plugin list

## Update Cordova to latest version

Install update plugin globally:

      $ npm install -g cordova-check-plugins
Then run from the root of your Cordova project. You can optionally update outdated plugins interactively or automatically, e.g.

      $ cordova-check-plugins --update=auto
## Upgrade with npm and force update
      $ npm update -f

## Cordova Plugin Reuirements
  The plugin 'cordova-plugin-compat' is required by (cordova-plugin-camera, cordova-plugin-geolocation) but forcing removal
  The plugin 'cordova-plugin-splashscreen' is required by (cordova-plugin-ionic)

  cordova-plugin-compat is deprecated in newer version of android above 6.3.0 you would need tobuild the app using the version
      $ cordova platform add android@6.2.0

## Using Social Login Facebook and Twitter
The app supports social login with Facebook and Twitter 

Create Facebook App ID and setup of user Login  
To use with the FB plugin, you first have to create a new Facebook App inside of the Facebook developer portal at https://developers.facebook.com/apps.

Retrieve the App ID and App Name

You can add APP ID into login.ts  file. 

    private facebookProvider: Facebook = new Facebook({
      clientId: "",
      appScope: ["email"]
    })

You need to change to ClientId to your facebook App ID.

Create Twitter App ID and setup of user Login 
1. Go to https://fabric.io  and create account  or Login.

2. Navigate to https://fabric.io/kits/android/crashlytics/install  and click on Add your API key on right side 

3. Copy your API key and replace API of Config.xml FABRIC_KEY .

4. Now you need to goto https://apps.twitter.com and create a new app you need to enter value in all the required fields.

5. Click on Key and access token tab 

6. Copy that API key and API Secret key to your XML file . These 2 information also needed in your Firebase twitter setup.  

7. You need to go to Fireabse console > authentication >Sign-In-Method  and enable Facebook and Twitter signIn method. You need to enter APP id and there secret key. 

## PUSH NOTIFICATION

The app support push notfiications - when a new picture is added - then you can use the app to push it out to others,

    1.  goto https://onesignal.com/

    2. create account or log in if you are already a registed user

    3. click on 'Add New App' on the screen window

    4. You need to Create certificate or key ID for the IOS and Android

    5. SETUP android FCM key https://documentation.onesignal.com/docs/generate-a-google-server-api-key

    6. SETUP IOS certificate for push https://documentation.onesignal.com/docs/generate-a-google-server-api-key

    7. Once new app setup successfully , click on the newly created app and go to app-setting where you will find one signal app-id in keys/ids section

    8. replace this key / id in your app.component.ts file , 

			 this.oneSignal.startInit('', ''); 

		The first parameter value key you get from oneSignal seeting and 2nd value is Sender ID that you get from Firebase . In Firebase you can click on gear icon on Overview then click on Project Setting and go to Cloud Messaging Tab and copy the Sender ID.


    9. now open your account window in onesignal.com and  go to new-message section where you can send notification

    10. If you want own Admin to use to send push notification instead of one Signal then you can use one Signal API

## DEPLOY TO PRODUCTION

Production Builds

To run or build your app for production, run

    ionic cordova run android --prod --release
    # or
    ionic cordova build android --prod --release

## Sign Android APK
If you want to release your app in the Google Play Store, you have to sign your APK file. To do this, you have to create a new certificate/keystore.

Let’s generate your private key using the keytool command that comes with the JDK:

  keytool -genkey -v -keystore plastic-app-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias plastic-app

You’ll first be prompted to create a password for the keystore. Then, answer the rest of the nice tools’s questions and when it’s all done, you should have a file called 
my-release-key.jks created in the current directory.

Note: Make sure to save this file somewhere safe, if you lose it you won’t be able to submit updates to your app!

To sign the unsigned APK, run the jarsigner tool which is also included in the JDK:

  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore plastic-app-key.jks android-release-unsigned.apk plastic-app

This signs the APK in place. Finally, we need to run the zip align tool to optimize the APK. The zipalign tool can be found in /path/to/Android/sdk/build-tools/VERSION/zipalign. For example, on OS X with Android Studio installed, zipalign is in ~/Library/Android/sdk/build-tools/VERSION/zipalign:


  zipalign -v 4 android-release-unsigned.apk HelloWorld.apk

To verify that your apk is signed run apksigner. The apksigner can be also found in the same path as the zipalign tool:

apksigner verify HelloWorld.apk

You can now publish your app.