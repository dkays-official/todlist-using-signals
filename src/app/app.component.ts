import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { TodoStoreService } from './services/todo-store.service';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, CommonModule],
  providers: [TodoStoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoList';
}
