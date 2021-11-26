import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { TodoList } from '../todolist';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todolist-form',
  templateUrl: './todolist-form.component.html',
  styleUrls: ['./todolist-form.component.scss']
})
export class TodolistFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  todoListId: number = 0;

  todolist: TodoList = { id: 0, name: "", category: "", items: []};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  todolist$: Subscription = new Subscription();
  postTodoList$: Subscription = new Subscription();
  putTodoList$: Subscription = new Subscription();

  constructor(private router: Router, private  todolistService: TodolistService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.todoListId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.todoListId  != null && this.todoListId > 0) {
      this.todolist$ = this.todolistService.getTodoListById(this.todoListId).subscribe(result => this.todolist = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.todolist$.unsubscribe();
    this.postTodoList$.unsubscribe();
    this.putTodoList$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postTodoList$ = this.todolistService.postTodoList(this.todolist).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putTodoList$ = this.todolistService.putTodoList(this.todoListId, this.todolist).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
