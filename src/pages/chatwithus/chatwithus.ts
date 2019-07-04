import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Chatmessage } from '../../models/chatwithus.model';

@IonicPage()
@Component({
  selector: 'chatwithus',
  templateUrl: 'chatwithus.html'
})

export class ChatwithusPage {
  public chatmessage : Chatmessage;
  public chatmessages : Chatmessage[];


  constructor(){
    this.chatmessage = new Chatmessage('', 'assets/img/user.png');
    this.chatmessages = [
      new Chatmessage('Welcome to chatbot universe', 'assets/img/bot.png', new Date())
    ];
  }
}