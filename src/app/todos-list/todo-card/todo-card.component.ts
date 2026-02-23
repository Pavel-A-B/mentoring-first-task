import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';
import { DeleteTodoDialogComponent } from '../../delete-todo-dialog/delete-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTodoDialogComponent } from '../../edit-todo-dialog/edit-todo-dialog.component';
import { CreateTodo } from '../../interfaces/create-todo.interface';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter<number>();
  editTodo = new EventEmitter();

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '600px',
      data: { todo: this.todo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteTodo.emit(this.todo.id);
        this.snackBar.open('Задача удалена!', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена удаления!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
  openEditDialog(): void {
    const dialofRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialofRef.afterClosed().subscribe((editResult: Todo) => {
      console.log('The dialog was closed47, Value:', editResult);
      if (editResult) {
        this.editTodo.emit(editResult);
        console.log('карточка', editResult);
        this.snackBar.open('Задача изменена', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена изменеия!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
