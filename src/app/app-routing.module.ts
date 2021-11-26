import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { TodolistFormComponent } from './todolist-form/todolist-form.component';
import { HomeComponent } from './home/home.component';
import { TodolistDetailComponent } from './todolist-detail/todolist-detail.component';
import { ItemFormComponent } from './item-form/item-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/form', component: TodolistFormComponent },
  { path: 'list/:id', component: TodolistDetailComponent },
  { path: 'item/form', component: ItemFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
