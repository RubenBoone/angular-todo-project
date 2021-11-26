import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TodoList} from '../todolist';
import {TodolistService} from '../todolist.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-todolist-list',
  templateUrl: './todolist-list.component.html',
  styleUrls: ['./todolist-list.component.scss']
})
export class TodolistListComponent implements OnInit, OnDestroy {
  todolists: TodoList[] = [];
  todolists$: Subscription = new Subscription();
  deleteTodoLists$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private todolistService: TodolistService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTodoLists();
  }

  ngOnDestroy(): void {
    this.todolists$.unsubscribe();
    this.deleteTodoLists$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['list/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['list/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteTodoLists$ = this.todolistService.deleteTodoList(id).subscribe(result => {
      //all went well
      this.todolistService.getTodoLists();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getTodoLists() {
    this.todolists$ = this.todolistService.getTodoLists().subscribe(result => this.todolists = result);
  }


}
