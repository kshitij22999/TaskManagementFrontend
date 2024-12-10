export class Task {
    _id?: any; 
    date?: String;
    entity_name?: String;
    task_type?: TaskType;
    status?: String;
    note?: String;
    contact_person?: String;
    time?: String;
  }
  
  export type TaskStatus = 'Open' | 'Closed';
  export enum TaskType {
    Meeting = 'Meeting',
    Call = 'Call',
    VideoCall = 'Video Call',
  }