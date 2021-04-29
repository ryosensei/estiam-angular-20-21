import { Injectable }   from '@angular/core';
import io               from 'socket.io-client';
import { SocketService }from "./socket.service";

@Injectable()

export class UserService {
    login: string;

    /**
     * User service : handle user's action with WS server
     */
    constructor(private socket: SocketService) {}

    /**
      * Set my username and send to WS Server
      */
    setUsername(username)
    {
        this.login = username;
        this.socket.login(username);
    }
}
