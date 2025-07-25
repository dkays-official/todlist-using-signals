import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';


interface Todo {
  _id?: string;
  text: string;
  completed: boolean;
  createdAt?: string; // Assuming your backend returns createdAt
}
  
@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {

  private apiUrl = 'http://localhost:3000/api/todos';

  //state as signals
  todos = signal<Todo[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  completedTodos = computed(() => this.todos().filter(todo => todo.completed));

  constructor(private http: HttpClient) {}

  loadTodos() {
    this.loading.set(true);
    this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(todos => {
        this.todos.set(todos);
        this.loading.set(false);
        this.error.set(null);
      }),
      catchError(err => {
        this.loading.set(false);
        this.error.set('Failed to load todos.');
        console.error(err);
        return of([]);
      })
    ).subscribe();
  }

  addTodo(text: string) {
    const newTodo = { text, completed: false };
    return this.http.post<Todo>(this.apiUrl, newTodo).pipe(
      tap(addedTodo => this.todos.update(currentTodos => [addedTodo, ...currentTodos])),
      catchError(err => {
      this.error.set('Failed to add todo.');
      console.error(err);
      return of(null);
      })
    );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<void>(`${this.apiUrl}/${todo._id}`).pipe(
      tap(() => this.todos.update(currentTodos => currentTodos.filter(t => t._id !== todo._id))),
      catchError(err => {
        this.error.set('Failed to delete todo.');
        console.error(err);
        return of(null);
      })
    );
  }


  toggleComplete(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, updatedTodo).pipe(
      tap(updated => this.todos.update(currentTodos =>
        currentTodos.map(t => t._id === updated._id ? updated : t)
      )),
      catchError(err => {
        this.error.set('Failed to toggle todo.');
        console.error(err);
        return of(null);
      })
    );
  }
}
