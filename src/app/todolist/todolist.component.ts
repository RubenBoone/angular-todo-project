import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { TodoList } from '../todolist';
import { Observable, timer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TodolistService } from '../todolist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, OnDestroy {
  todolists: TodoList[] = [];
  todolists$: Subscription = new Subscription();
  deleteTodoLists$: Subscription = new Subscription();

  errorMessage: string = '';
  items: Array<Item> = []
  @Input() todolist: TodoList = {id: 0, name: "", category: "", items: []}

  constructor(private todolistService: TodolistService, private router: Router) {
    this.items = this.todolist.items;
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
      this.refresh();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  refresh(): void {
    window.location.reload();
 }

  getTodoLists() {
    this.todolists$ = this.todolistService.getTodoLists().subscribe(result => this.todolists = result);
  }


}
