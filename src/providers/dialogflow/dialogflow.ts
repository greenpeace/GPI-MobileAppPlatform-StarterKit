import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

import { dialogflow } from '../../config/dialogflow.ts';

/*
  Generated class for the DialogflowProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DialogflowProvider {
  
  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = dialogflow.dialogflowtoken;

  constructor(private http: Http){}
  
  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345'
    }
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .pipe(map(res => {
        return res.json()
      }))
  }
  
  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}