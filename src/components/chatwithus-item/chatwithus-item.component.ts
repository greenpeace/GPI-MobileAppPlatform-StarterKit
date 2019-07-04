import { Component, OnInit, Input } from '@angular/core';
import { Chatmessage } from '../../models/chatwithus.model';

@Component({
  selector: 'chatwithus-item',
  templateUrl: 'chatwithus-item.component.html'
})
export class ChatwithusItemComponent implements OnInit {
 
  @Input('chatmessage')
 
  private chatmessage: Chatmessage;
 
  constructor() { }
 
  ngOnInit() {
  }
}