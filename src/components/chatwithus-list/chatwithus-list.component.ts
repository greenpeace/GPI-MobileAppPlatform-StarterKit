import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Chatmessage } from '../../models/chatwithus.model';
import { ChatwithusItemComponent } from '../chatwithus-item/chatwithus-item.component';

@Component({
  selector: 'chatwithus-list',
  templateUrl: 'chatwithus-list.component.html'
})
export class ChatwithusListComponent implements OnInit, AfterViewInit {

  @Input('chatmessages')
  private chatmessages: Chatmessage[];

  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatwithusItemComponent, { read: ElementRef }) chatItems: QueryList<ChatwithusItemComponent>;

  constructor() { }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  ngOnInit() {
  }
}