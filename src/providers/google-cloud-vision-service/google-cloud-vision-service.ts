import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { googlecloudapi } from '../../config/googlecloud.api';

@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: Http) { }

// Setting up to detect logo in an image

  getLabels(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LOGO_DETECTION"
            }
          ]
        }
      ]
    }

    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + googlecloudapi.googleCloudVisionAPIKey, body);
  }
}