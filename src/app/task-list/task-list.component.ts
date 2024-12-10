import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskmanagementServiceService } from '../services/taskmanagement-service.service';
import { response } from 'express';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskmanagementServiceService) {}

  tasks: Task[] = [];
  headers = [
    { name: 'Date', filterApplied: false , field: 'date' },
    { name: 'Entity Name', filterApplied: false , field: 'entity_name' },
    { name: 'Task Type', filterApplied: false , field: 'task_type' },
    { name: 'Time', filterApplied: false  , field: 'time' },
    { name: 'Contact Person', filterApplied: false , field: 'contact_person' },
    { name: 'Notes', filterApplied: false , field:'note' },
    { name: 'Status', filterApplied: false , field:'status' },
    { name: 'Options', filterApplied: false }
  ];
  groupedTask!: Map<String, { date: String; taskCount: number; tasks: Task[]; }>;
  hoveredTask: any = null;
  isTaskFormOpen = false;
  showFilterPopup = false; // Toggle for popup visibility
  activeHeaderIndex: number | null = null; // Track which header's filter is active
  filterValue = ''; // Value entered for the filter
  popupPosition = { top: '0px', left: '0px' }; // Dynamic positioning of the popup


  ngOnInit(): void {
    this.fetchTasks();
    
  }

  openFilterModal(index: number, event?: MouseEvent): void {
    this.activeHeaderIndex = index;
    this.filterValue = ''; // Clear filter input when opening popup
    this.showFilterPopup = true;

    // Dynamically position the popup based on button location
    if (event) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.popupPosition = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      };
    }
  }

  closeFilterModal(): void {
    this.showFilterPopup = false;
    this.activeHeaderIndex = null;
    this.fetchTasks();
  }

  hoverStatus(task: any) {
    this.hoveredTask = task;
  }
  closeStatusPopup() {
    this.hoveredTask = null;
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.groupTasks(this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.fetchTasks();
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }

  openTaskForm() {
    // Open the task form modal
  }

  addNote(task: Task) {
    
  }

  toggleDropdown(task: any) {
    task.showDropdown = !task.showDropdown;
  }

  editTask(task: any) {
    
  }

  duplicateTask(task: Task) {
    this.taskService.createTask(task).subscribe((response)=>{this.fetchTasks();})
  }

  toggleStatus(task: Task) {
    const taskId = task._id.$oid;
    delete task._id;
    task.status = task.status === 'Open'? 'Closed' : 'Open';
    this.taskService.updateTask(taskId, task).subscribe((response) => {
      this.fetchTasks();
    });
  }
  
  groupTasks(tasks: Task[]) {
    this.groupedTask = new Map();
  
    tasks.forEach(task => {
      const taskDate = task.date || 'Unknown Date';
  
      // Check if the date already exists in the map
      if (!this.groupedTask.has(taskDate)) {
        this.groupedTask.set(taskDate, {
          date: taskDate,
          taskCount: 0,
          tasks: []
        });
      }
  
      // Get the existing entry and update it
      const group = this.groupedTask.get(taskDate)!;
      group.tasks.push(task);
      if (task.status === 'Open'){group.taskCount++;}
    });
  }

  

  showTaskForm() {
    this.isTaskFormOpen = true;   
  }

  closeTaskForm() {
    this.isTaskFormOpen = false;
  }

  handleSave(task: Task) {
    this.taskService.createTask(task).subscribe((response) => {
      this.fetchTasks();
    });
  }

  applyFilter(field:string, value:string){
    let filteredTasks:Task[] = [];
    this.taskService.filterTasks(field, value).subscribe((response) =>{
      filteredTasks = response;
      this.tasks = response;
      this.groupTasks(this.tasks);

    });
  }
}
