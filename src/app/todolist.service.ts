import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoList } from './todolist';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor(private httpClient: HttpClient) {}

  getTodoLists(): Observable<TodoList[]> {
    return this.httpClient.get<TodoList[]>("http://localhost:3000/lists?_embed=items");
  }

  getTodoListById(id: number): Observable<TodoList> {
    return this.httpClient.get<TodoList>("http://localhost:3000/lists/" + id + "?_embed=items");
  }

  postTodoList(todolist: TodoList): Observable<TodoList> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<TodoList>("http://localhost:3000/lists", todolist, {headers: headers});
}
putTodoList(id:number, todolist: TodoList): Observable<TodoList> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');

  return this.httpClient.put<TodoList>("http://localhost:3000/lists/" + id, todolist, {headers: headers});
}

deleteTodoList(id: number): Observable<TodoList> {
  return this.httpClient.delete<TodoList>("http://localhost:3000/lists/" + id);
}
}
