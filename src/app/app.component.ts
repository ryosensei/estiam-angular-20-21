import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todolist';

  tasks = [];

  addTask(Task)
  {
    this.tasks.push({
      name: Task.name,
      description: Task.description
    });
  }

  removeTask(toRemove)
  {
    this.tasks = this.tasks.filter((elem, i) => {
      return i !== toRemove;
    });
  }
}
