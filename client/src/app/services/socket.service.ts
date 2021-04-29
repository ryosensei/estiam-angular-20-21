import { Injectable } from '@angular/core';
import io           from 'socket.io-client';
import { MessageModel } from "./../models/message.model";
import { UserModel } from "./../models/user.model";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()

export class SocketService {

    socket;
    username : string         = "";
    users    : UserModel[]    = [];
    messages : MessageModel[] = [];

    constructor(private router: Router)
    {
        // this.socket = io("ws://localhost:3001");            // Connect to WS
        this.socket = io("ws://163.172.149.194:3001");

        // Handle events
        this.handleOnlineUsers();
        this.handleHistory();
        this.handleIncoming();
        this.handleConnect();
        this.handleDisconnect();

        // By default connect with my previous name
        let username = localStorage.getItem("name");
        if (username) {
            this.login();
            this.router.navigate(['chat']);
        }
    }

    /**
     * Send identification to server
     */
    login(username = null)
    {
        username = username ?? localStorage.getItem("name");
        this.username = username;
        this.socket.emit("identify", {
            name: username
        });
        localStorage.setItem("name", username);
    }

    /**
     * when get the list of online users
     */
    handleOnlineUsers()
    {
        this.socket.on('online-users', users => {
            this.users = [];
            users.map(u => {
                let user = new UserModel();
                user.name = u.name;
                user.connectedAt = u.connectedAt;
                this.users.push(user);
            });
        });
    }

    /**
     * when get the message history
     */
    handleHistory()
    {
        this.socket.on('history', history => {
            for (let i in history) {
                let message = history[i];
                let model = new MessageModel(message.from, message.message, message.date, (message.from === this.username));
                this.messages.push(model);
            };
        });
    }

    /**
     * New message
     */
    handleIncoming()
    {
        this.socket.on('message', message => {
            let model = new MessageModel(message.from, message.message, message.date, (message.from === this.username));
            this.messages.push(model);
        });
    }

    /**
     * New user connect
     */
    handleConnect()
    {
        this.socket.on('user-connected', username => {
            let user = new UserModel();
            user.name = username;
            this.users.push(user);
        });
    }

    /**
     * When user disconnect
     */
    handleDisconnect()
    {
        this.socket.on('user-disconnected', username => {
            this.users = this.users.filter(user => {
                return (user.name !== username);
            })
        });
    }

    /**
     * Send new message
     */
    sendMessage(message)
    {
        this.socket.emit("new-message", message);
        return true;
    }

    /**
     * When I log-out
     */
    disconnect()
    {
        this.socket.disconnect();
    }
}
