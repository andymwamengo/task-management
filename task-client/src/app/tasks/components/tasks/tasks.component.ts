/**
 * TasksComponent
 */
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { TaskEntity } from '../../../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$?: Observable<TaskEntity[]>;
  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [3, 6, 9, 12];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void{
    this.tasks$ = this.taskService.getAllTasks();
  }
  onPageDataChange(event: any): void {
    this.page = event;
    this.fetchTasks();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fetchTasks();
  }

}
