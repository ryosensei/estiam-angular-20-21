import { Component, Input }from '@angular/core';
import { Task }            from './models/task.model';
import { HttpClient }      from '@angular/common/http';
import axios               from 'axios';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'todolist';

    tasks = [];

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.getTasks();
    }

    async getTasks()
    {
        // Methode 1
        // on attends le résultat de la requête
        let response = await axios.get('http://localhost:3000/tasks').catch(err => {
            console.error(err);
        });

        if (response) {
            this.tasks = response.data;
        }

        // Methode 2
        // asynchrone
        // let onSuccess = (response) => {
        //     this.tasks = response;
        // };
        // let onError = (response) => {
        //     console.error(response);
        // };
        // await this.httpClient.get("http://localhost:3000/tasks").subscribe(onSuccess, onError);
    }

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
