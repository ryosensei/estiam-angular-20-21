import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { SocketService } from "./../../services/socket.service";

@Component({
  selector: 'chat-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') public myScrollContainer: ElementRef;

  constructor(public socket: SocketService) { }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
        this.scrollToBottom();
    }

  scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) {
          console.log(err);
        }
    }

}
