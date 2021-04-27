import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from './../models/task.model';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

    name = new FormControl();
    desc = new FormControl();

    @Output() newTaskEmitter = new EventEmitter<Task>();

    constructor() { }

    ngOnInit(): void {
    }

    newTask()
    {
        let task = new Task();
        task.name        = this.name.value;
        task.description = this.desc.value;

        this.newTaskEmitter.emit(task);

        this.name.setValue("");
        this.desc.setValue("");

        return false;
    }
}
