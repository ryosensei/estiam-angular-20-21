import { Component, Input } from '@angular/core';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  tasks = [];

  addTask(task: Task): void
  {
    this.tasks.push(task);
  }

  removeTask(toRemove)
  {
    this.tasks = this.tasks.filter((elem, i) => {
      return i !== toRemove;
    });

  }
}
