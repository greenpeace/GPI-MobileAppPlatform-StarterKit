import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { googleautomlapi } from '../../config/googlecloudautoml.ts';

@Injectable()
export class GoogleCloudAutoMlServiceProvider {

  constructor(public http: Http) { }

// Setting up to detect logo in an image
 predictImage(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          }
        }
      ]
    }
    return this.http.post('https://automl.googleapis.com/v1beta1/projects/torbjorn-zetterlund/locations/us-central1/models/ICN759721752742708281:predict -d', body);
  }

// Setting up to detect logo in an image
 importImage(base64Image) {
    const body = {
      "inputConfig":
        {
//         object(base64Image)
         }
    }
    return this.http.post('https://automl.googleapis.com/v1beta1/typeoftrash:importData?key=' + googleautomlapi.googleCloudVisionAPIKey, body);
  }

}

// https://automl.googleapis.com/v1beta1/{name}:importData