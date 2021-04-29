import { Component, OnInit } from '@angular/core';
import { SocketService } from "./../services/socket.service";
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    messageForm: FormGroup;

    constructor(private formBuilder: FormBuilder, protected socket: SocketService, private router: Router) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm()
    {
        this.messageForm = this.formBuilder.group({
            message: '',
        });
    }

    sendMessage()
    {
        this.socket.sendMessage(this.messageForm.value["message"]);
        this.initForm();
    }

    logout()
    {
        this.socket.disconnect();
        localStorage.removeItem("name");
        this.router.navigate(['']);
    }

}
