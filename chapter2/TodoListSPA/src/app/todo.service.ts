import { Todo } from './todo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from './app-config.json';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUri = config.resources.todoListApi.resourceUri;
  graphUri = config.resources.graphApi.resourceUri;

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(this.graphUri);
  }

  getAll() {
    return this.http.get<string[]>(this.apiUri + '/' +  'getAll');
  }

  getTodos() { 
    return this.http.get<Todo[]>(this.apiUri);
  }

  getTodo(id) { 
    return this.http.get<Todo>(this.apiUri + '/' +  id);
  }
  
  postTodo(todo) { 
    return this.http.post<Todo>(this.apiUri, todo);
  }

  deleteTodo(id) {
    return this.http.delete(this.apiUri + '/' +  id);
  }

  editTodo(todo) { 
    return this.http.put<Todo>(this.apiUri + '/' +  todo.id, todo);
  }
}
