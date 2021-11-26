import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TodoList } from '../todolist';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todolists: TodoList[] = [];
  todolistss$: Subscription = new Subscription();

  todolists$: Observable<TodoList[]> = new Observable<TodoList[]>();

  constructor(private todolistService: TodolistService, private router: Router) { }

  ngOnInit(): void {
    this.todolists$ = this.todolistService.getTodoLists();
    this.getTodoLists();
  }

  ngOnDestroy(): void {
    this.todolistss$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['list/form'], {state: {mode: 'add'}});
  }

  getTodoLists() {
    this.todolistss$ = this.todolistService.getTodoLists().subscribe(result => this.todolists = result);
  }

}
