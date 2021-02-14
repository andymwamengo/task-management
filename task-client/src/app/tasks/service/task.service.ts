/**
 * Task Service
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { TaskEntity } from 'src/app/models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskEntity[]> {
    return this.http.get<TaskEntity[]>(
      `${environment.apiUrl}/tasks/results`).pipe(shareReplay(1));
  }

  getTaskById(id: number): Observable<TaskEntity> {
    return this.http.get<TaskEntity>(
      `${environment.apiUrl}/tasks/find/${id}`).pipe(shareReplay(1));
  }

  createTask(task: TaskEntity): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/tasks/create`, task).pipe(shareReplay(1));
  }

  updateTask(id: number, task: TaskEntity): Observable<TaskEntity> {
    return this.http.patch<TaskEntity>(
      `${environment.apiUrl}/tasks/update/${id}`, task
    ).pipe(shareReplay(1));
  }

  deleteTask(id: number): Observable<TaskEntity> {
    return this.http.delete<TaskEntity>(
      `${environment.apiUrl}/tasks/delete/${id}`).pipe(shareReplay(1));
  }
}
