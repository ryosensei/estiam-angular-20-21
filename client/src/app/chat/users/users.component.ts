import { Component, OnInit } from '@angular/core';
import { SocketService } from "./../../services/socket.service";

@Component({
    selector: 'chat-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    constructor(public socket: SocketService) { }

    ngOnInit(): void {
    }

}
