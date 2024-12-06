import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../task.model';
import { TaskmanagementServiceService } from '../services/taskmanagement-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnChanges {

  tasks: Task[] = [];

  constructor(private taskService: TaskmanagementServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.fetchTasks(); 
  }

  ngOnInit(): void {
    this.fetchTasks(); 
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

}
