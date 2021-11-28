import { Component, OnInit } from '@angular/core';
import { TodoList } from '../todolist';
import { Router } from '@angular/router';
import { TodolistService } from '../todolist.service';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item';
import { Status } from '../status';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-todolist-detail',
  templateUrl: './todolist-detail.component.html',
  styleUrls: ['./todolist-detail.component.scss']
})
export class TodolistDetailComponent implements OnInit {
  todolist: TodoList = {id: 0, name: "", category: "", items: []}
  statuses: Status[] = [];

  items: Item[] = [];
  items$: Subscription = new Subscription();
  todolists: TodoList[] = [];
  todolists$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();
  statuses$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private statusService: StatusService, private todolistService: TodolistService, private itemService: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const todoId = this.route.snapshot.paramMap.get('id');
    if (todoId != null) {
      this.todolistService.getTodoListById(+todoId).subscribe(result => this.todolist = result);
      this.itemService.getItemsByListId(+todoId).subscribe(result => this.items = result);
      this.statusService.getStatuses().subscribe(result => this.statuses = result)
    }
  }

  ngOnDestroy(): void {
    this.todolists$.unsubscribe();
    this.items$.unsubscribe();
    this.statuses$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['item/form'], {state: {listId: this.route.snapshot.paramMap.get('id'), mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['item/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteItem$ = this.itemService.deleteItem(id).subscribe(result => {
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

  getItems(){
    this.items$ = this.itemService.getItemsByListId(this.todolist.id).subscribe(result => this.items = result)
  }
  getItemsAsc(){
    this.items$ = this.itemService.getItemsByListIdStatusAcs(this.todolist.id).subscribe(result => this.items = result)
  }
  getItemsDesc(){
    this.items$ = this.itemService.getItemsByListIdStatusDesc(this.todolist.id).subscribe(result => this.items = result)
  }

  getStatuses(){
    this.statuses$ = this.statusService.getStatuses().subscribe(result => this.statuses = result)
  }
}
