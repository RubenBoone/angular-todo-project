import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Status } from '../status';
import { StatusService } from '../status.service';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;
  listId: number = 0;
  statuses: Status[] = [];

  item: Item = {id: 0, listId: 0, title: "", description: "", date: new Date(), statusId: 0, order: 0}

  isSubmitted: boolean = false;
  errorMessage: string = "";

  statuses$: Subscription = new Subscription();
  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  selectedOption: number = 1;

  constructor(private router: Router, private  itemService: ItemService, private statusService: StatusService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = +this.router.getCurrentNavigation()?.extras.state?.id;
    this.listId = +this.router.getCurrentNavigation()?.extras.state?.listId;
    this.statusService.getStatuses().subscribe(result => this.statuses = result);

    if (this.itemId  != null && this.itemId > 0) {
      this.item$ = this.itemService.getItemById(this.itemId).subscribe(result => this.item = result);
    }
    this.statusService.getStatuses().subscribe(result => this.statuses = result);


  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
    this.statuses$.unsubscribe();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.item.listId = this.listId;
      this.item.statusId = this.selectedOption;
      this.postItem$ = this.itemService.postItem(this.item).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/list/" + this.listId);
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.item.statusId = this.selectedOption;
      this.putItem$ = this.itemService.putItem(this.itemId, this.item).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/list/" + this.item.listId);
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

  getStatuses(){
    this.statuses$ = this.statusService.getStatuses().subscribe(result => this.statuses = result)
  }
}
