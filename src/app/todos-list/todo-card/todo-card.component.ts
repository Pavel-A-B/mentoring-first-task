import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component ({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})

export class TodoCardComponent{
@Input()
todo: any
  @Output()
  deleteTodo = new EventEmitter()

  onDeleteTodo(userID:number) {
    this.deleteTodo.emit(userID)
  } 

}