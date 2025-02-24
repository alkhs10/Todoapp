import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment'; 

export interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = environment.apiUrl;
  private todosSubject = new BehaviorSubject<TodoItem[]>([]); 
  todos$ = this.todosSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}/todo`).pipe(
      tap(todos => this.todosSubject.next(todos)), 
      catchError(err => {
        console.error('Failed to fetch todos:', err);
        return of([]);
      })
    );
  }

  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/todo/${id}`).pipe(
      catchError(err => {
        console.error('Failed to fetch todo:', err);
        return throwError('Failed to fetch todo');
      })
    );
  }

  addTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/todo`, todo).pipe(
      tap(() => this.getAllTodos().subscribe()),
      catchError(err => {
        console.error('Failed to add todo:', err);
        return throwError('Failed to add todo');
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todo/${id}`).pipe(
      tap(() => this.getAllTodos().subscribe()),
      catchError(err => {
        console.error('Failed to delete todo:', err);
        return throwError('Failed to delete todo');
      })
    );
  }

  markAsDone(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/todo/${id}/done`, {}).pipe(
      tap(() => this.getAllTodos().subscribe()), 
      catchError(err => {
        console.error('Failed to mark todo as done:', err);
        return throwError('Failed to mark todo as done');
      })
    );
  }

  reloadTodos(): Observable<TodoItem[]> {
    return this.getAllTodos(); 
  }
}
