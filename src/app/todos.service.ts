import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './interfaces/todos.interface';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]) {
    this.todosSubject$.next(todos);
  }

  editTodo(editTodo: Todo) {
    this.todosSubject$.next(
      this.todosSubject$.value.map((todo: Todo) => {
        if (todo.userId === editTodo.userId) {
          return editTodo;
        } else {
          return todo;
        }
      })
    );
  console.log('The dialog was closed, editTodo222222:', editTodo);
  }

  createTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  deleteTodo(id: number) {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item: Todo) => item.id !== id)
    );
  }
}
