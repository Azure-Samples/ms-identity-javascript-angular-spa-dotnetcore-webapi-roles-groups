import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { TodoService } from './../../services/todo.service';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { Todo } from '../../interfaces/todo';
import * as config from '../../app-config.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: string[] = [];
  todos: Todo[] = [];
  table: any = [];

  constructor(private authService: MsalService, private service: TodoService, private broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log(payload);
      console.log('access token acquired: ' + new Date().toString());
    });
 
    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log(payload);
      console.log('access token acquisition fails');
    });

    this.getAll()
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: (response: any[]) => {
        console.log(response);
        this.todos = response;
        this.tabulateTodos(this.todos);
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
          this.authService.acquireTokenPopup({
            scopes: this.authService.getScopesForEndpoint(config.resources.todoListApi.resourceUri)
          })
          .then(() => {
            this.service.getTodos()
              .toPromise()
              .then((response: any[])  => {
                console.log(response);
                this.todos = response;
                this.tabulateTodos(this.todos);
              });
          });
        }
      }
    });
  }

    tabulateTodos(todos): void {
      todos.map((todo) => {
        if (!this.users.includes(todo.owner)) {
          this.users.push(todo.owner)
          this.table.push({"owner": todo.owner, "tasks": todos.filter(t => t.owner === todo.owner)})
          console.log(this.table)
        }
      })  
    }

}
