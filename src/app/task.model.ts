export interface Task {
    id: string; 
    date: String;
    entity_name: String;
    task_type: TaskType;
    status: TaskStatus;
    note: String;
    contact_person: String;
    time: String;
  }
  
  export type TaskStatus = 'Open' | 'Closed';
  export enum TaskType {
    Meeting = 'Meeting',
    Call = 'Call',
    VideoCall = 'Video Call',
  }