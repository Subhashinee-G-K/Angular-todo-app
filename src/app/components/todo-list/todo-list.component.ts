import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';

import { Todo } from '../../models/todo.model';
import { TodoCreateComponent } from '../todo-create/todo-create.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  private _bottomSheet = inject(MatBottomSheet);

  todoList: Todo[] = [];

  constructor() {
    this.todoService.getItems().subscribe(data => {
      this.todoList = data;
    });
  }

  addNewTodo() {
    this._bottomSheet.open(TodoCreateComponent);
  }

  markAsCompleted(item: Todo) {
    item.completed = true;
    this.todoService.updateItem(item.id, item).catch(error => {
      console.error('Error:', error);
    });
  }

  markAsInCompleted(item: Todo) {
    item.completed = false;
    this.todoService.updateItem(item.id, item).catch(error => {
      console.error('Error:', error);
    });
  }

  deleteTodo(item: Todo) {
    this.todoService.deleteItem(item.id).catch(error => {
      console.error('Error:', error);
    });
  }
}
