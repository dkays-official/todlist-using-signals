import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStoreService } from '../../services/todo-store.service';


interface Todo {
  _id?: string;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStoreService]
})
export class TodoListComponent {

  todoStore = inject(TodoStoreService);
  newTodoText = '';

  ngOnInit(): void {
    this.todoStore.loadTodos();
  }

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todoStore.addTodo(this.newTodoText).subscribe(() => this.newTodoText = '');
    }
  }

  deleteTodo(todo: Todo): void {
    this.todoStore.deleteTodo(todo).subscribe();
  }

  toggleComplete(todo: Todo): void {
    this.todoStore.toggleComplete(todo).subscribe();
  }

}
