import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() isOpen: boolean = false; 
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  // task = {
  //   status: 'Open',
  //   entity_name: '',
  //   date: '',
  //   time: { hour: '12', minute: '00', period: 'PM' },
  //   task_type: 'Call',
  //   phone_number: '',
  //   contact_person: '',
  //   note: ''
  // };
  task!: Task;
  time!:{ hour:string; minute:string; period:string};
  taskTypes = ['Call', 'Meeting', 'Video Call'];
  hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  ngOnInit(){
    this.task = new Task();
    this.task.status = 'Open';
    this.time ={ hour: '12', minute: '00', period: 'PM' };
  }

  setStatus(status: string) {
    this.task.status = status;
  }

  saveTask() {
    this.dataCleanup();
    this.save.emit(this.task);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  dataCleanup(){
    this.task.time = `${this.time.hour}:${this.time.minute} ${this.time.period}`;
  }
}
