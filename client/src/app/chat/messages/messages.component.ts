import { Component, OnInit } from '@angular/core';
import { SocketService } from "./../../services/socket.service";

@Component({
  selector: 'chat-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public socket: SocketService) { }

  ngOnInit(): void {
  }

}
