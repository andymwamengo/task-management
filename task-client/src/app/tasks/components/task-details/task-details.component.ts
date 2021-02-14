/**
 * TaskDetailsComponent
 */
import { Component, OnInit } from '@angular/core';
import { TaskEntity } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task$?: Observable<TaskEntity>;

  constructor( private taskService: TaskService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    const taskId: any = this.route.snapshot.paramMap.get('id');
    this.task$ = this.taskService.getTaskById(taskId).pipe(first());
  }

}
