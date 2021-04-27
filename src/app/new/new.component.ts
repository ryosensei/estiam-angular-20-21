import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

import { Task } from './../models/task.model';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

    // name = new FormControl();
    // desc = new FormControl();

    taskForm: FormGroup;


    @Output() newTaskEmitter = new EventEmitter<Task>();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.initForm();
    }

    initForm()
    {
      this.taskForm = this.formBuilder.group({
        name: '',
        desc: ''
      });
    }

    newTask()
    {
        let task         = new Task();
        task.name        = this.taskForm.value["name"];
        task.description = this.taskForm.value["desc"];
        task.date        = Date.now();

        this.newTaskEmitter.emit(task);

        this.initForm();

        return false;
    }
}
