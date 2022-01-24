/**
 * TaskEdit Component
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TaskEntity } from '../../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  taskForm!: FormGroup;
  loading = false;
  submitted = false;
  error!: any;
  taskId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskId = this.router.snapshot.params.id;
    const resp = this.taskService.getTaskById(this.taskId).pipe(first());
    resp.subscribe(
      (res: TaskEntity) => {
        this.taskForm.patchValue(res);
      },
      (_error) => {
      }
    );
  }

  // access to form fields
  get f(): any {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).pipe(first()).subscribe(
        (_res: any) => {
          this.route.navigate(['/user/account']);
        },
        (error: any) => {
          this.error = error;
        }
      );
    }
  }
}
