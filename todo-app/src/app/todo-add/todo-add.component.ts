import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { TodoService, TodoItem } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  newTodo: TodoItem = { id: 0, title: '', isDone: false };

  constructor(private todoService: TodoService) {}

  

  addTodo(): void {
    this.todoService.addTodo(this.newTodo).subscribe({
      next: () => {
        this.newTodo = { id: 0, title: '', isDone: false };
        this.todoService.reloadTodos().subscribe(todos => {
          console.log('Todos reloaded:', todos);
        });
      },
      error: (err) => console.error('Failed to add todo:', err),
    });
  }

}