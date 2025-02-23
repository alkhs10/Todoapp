import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { TodoService, TodoItem } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  searchId: number | null = null; 
  searchedTodo: TodoItem | null = null; 

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Subscribe to the todos observable so the list is updated live whenever it changes
    this.todoService.todos$.subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => console.error('Failed to load todos:', err),
    });

    // Optionally, you can call getAllTodos initially to fetch todos if needed
    this.todoService.reloadTodos();
  }

  searchTodoById(): void {
    if (this.searchId !== null) {
      this.todoService.getTodoById(this.searchId).subscribe({
        next: (data) => {
          this.searchedTodo = data;
        },
        error: (err) => {
          console.error('Failed to fetch todo:', err);
          this.searchedTodo = null; 
          alert('Todo not found!'); 
        },
      });
    }
  }

  markSearchedTodoAsDone(): void {
    if (this.searchedTodo && this.searchedTodo.id) {
      this.todoService.markAsDone(this.searchedTodo.id).subscribe({
        next: () => {
          console.log('Todo marked as done');
          this.searchTodoById();  // Refresh the searched todo after marking as done
        },
        error: (err) => console.error('Failed to mark todo as done:', err),
      });
    }
  }

  deleteSearchedTodo(): void {
    if (this.searchedTodo && this.searchedTodo.id) {
      this.todoService.deleteTodo(this.searchedTodo.id).subscribe({
        next: () => {
          console.log('Todo deleted');
          this.searchedTodo = null; 
        },
        error: (err) => console.error('Failed to delete todo:', err),
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        console.log('Todo deleted');
        // No need to call loadTodos as the subscription will automatically update the list
      },
      error: (err) => console.error('Failed to delete todo:', err),
    });
  }

  markAsDone(id: number): void {
    this.todoService.markAsDone(id).subscribe({
      next: () => {
        console.log('Todo marked as done');
        // No need to call loadTodos as the subscription will automatically update the list
      },
      error: (err) => console.error('Failed to mark todo as done:', err),
    });
  }
}
