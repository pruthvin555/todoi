import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { TodoState } from '../../states/todo.state';
import { Select, Store } from '@ngxs/store';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs';
import { DeleteTodo, GetTodos, SetSelectedTodo } from '../../actions/todo.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  items: Array<any>;
  private fullItems: Array<any> = [];
  public filterCompleted: boolean = false;

  constructor(
    public itemService: ItemService,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetTodos());
    this.todos.subscribe(list => {
      this.items = list;
      this.fullItems = list;
    });
  }

  public deleteItem(value: any): void {
    this.store.dispatch(new DeleteTodo(value.id));
  }

  public filterItems(checked): void {
    this.items = checked ? this.fullItems.filter(item => item.isCompleted) : this.fullItems;
  }

  public editTodo(payload: Todo) {
    payload.isCompleted = !payload.isCompleted;
    this.store.dispatch(new SetSelectedTodo(payload));
  }
}
