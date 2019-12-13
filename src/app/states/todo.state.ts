import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../models/Todo';
import { AddTodo, DeleteTodo, GetTodos, SetSelectedTodo, UpdateTodo } from '../actions/todo.action';
import { tap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';

export class TodoStateModel {
    todos: Todo[];
    selectedTodo: Todo;
}

@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        todos: [],
        selectedTodo: null
    }
})
export class TodoState {

    constructor(private itemService: ItemService) {
    }

    @Selector()
    static getTodoList(state: TodoStateModel) {
        return state.todos;
    }

    @Selector()
    static getSelectedTodo(state: TodoStateModel) {
        return state.selectedTodo;
    }

    @Action(GetTodos)
    getTodos({ getState, setState }: StateContext<TodoStateModel>) {
        const state = getState();
        setState({
            ...state,
            todos: this.itemService.getItems(),
        });
    }

    @Action(AddTodo)
    addTodo({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
        const state = getState();
        patchState({
            todos: [...state.todos, payload]
        });
    }

    @Action(UpdateTodo)
    updateTodo({ getState, setState }: StateContext<TodoStateModel>, { payload }: UpdateTodo) {
        const state = getState();
        const todoList = [...state.todos];
        const todoIndex = todoList.findIndex(item => item.id === payload.id);
        todoList[todoIndex] = payload;
        setState({
            ...state,
            todos: todoList,
        });
    }


    @Action(DeleteTodo)
    deleteTodo({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodo) {
        const state = getState();
        const filteredArray = state.todos.filter(item => item.id !== id);
        setState({
            ...state,
            todos: filteredArray,
        });
    }

    @Action(SetSelectedTodo)
    setSelectedTodoId({ getState, setState }: StateContext<TodoStateModel>, { payload }: SetSelectedTodo) {
        const state = getState();
        setState({
            ...state,
            selectedTodo: payload
        });
    }
}