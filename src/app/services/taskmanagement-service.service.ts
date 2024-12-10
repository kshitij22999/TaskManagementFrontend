import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskStatus } from '../../app/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagementServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:5000/api';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task:Task): Observable<any> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  deleteTask(taskId:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: string, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  filterTasks(field:string, value:string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?${field}=${value}`);
  }

}
