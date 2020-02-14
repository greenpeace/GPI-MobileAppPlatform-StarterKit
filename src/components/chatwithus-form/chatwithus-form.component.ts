import { Component, OnInit, Input } from '@angular/core';
import { Chatmessage } from '../../models/chatwithus.model';
import { DialogflowProvider } from '../../providers/dialogflow/dialogflow';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'chatwithus-form',
  templateUrl: 'chatwithus-form.component.html'
})
export class ChatwithusFormComponent implements OnInit {

  @Input('chatmessage')
  private chatmessage : Chatmessage;
  
  @Input('chatmessages')
  private chatmessages : Chatmessage[];

  constructor(
    private dialogFlow: DialogflowProvider,
    public ga: GoogleAnalytics) { }
  
  ngOnInit() {
    this.googleanalyticstrack();
  }
  
  public sendMessage(): void {
    this.chatmessage.timestamp = new Date();
    this.chatmessages.push(this.chatmessage);

    this.dialogFlow.getResponse(this.chatmessage.content).subscribe(res => {
      this.chatmessages.push(
        new Chatmessage(res.result.fulfillment.speech, 'assets/img/bot.png', res.timestamp)
      );
    });

    this.chatmessage = new Chatmessage('', 'assets/img/user.png');
  }

  /*
  * --------------------------------------------------------------
  * Google Analytics
  * --------------------------------------------------------------
  */
  googleanalyticstrack() {
    this.ga.startTrackerWithId('UA-67462967-9')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('BOT Chat');
        this.ga.trackEvent('botchat', 'event', 'BOT Chat', 1);
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

}