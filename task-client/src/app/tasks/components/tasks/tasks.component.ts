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

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAllTasks();
  }

}
