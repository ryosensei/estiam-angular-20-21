import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { ReactiveFormsModule }from '@angular/forms';

import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';
import { AuthComponent }      from './auth/auth.component';

import { UserService }        from "./services/user.service";
import { SocketService }      from "./services/socket.service";
import { ChatComponent }      from './chat/chat.component';
import { UsersComponent }     from './chat/users/users.component';
import { MessagesComponent }  from './chat/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatComponent,
    UsersComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
