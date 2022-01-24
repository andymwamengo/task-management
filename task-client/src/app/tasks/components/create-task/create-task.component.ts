/**
 * CreateTaskComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  loading = false;
  submitted = false;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f(): any {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.taskForm.invalid) {
      return;
    }
    this.loading = true;
    const task = this.taskService.createTask(this.taskForm.value).pipe(first());
    task.subscribe(
      (_res) => {
        this.router.navigate(['/user/account']);
      },
      (_error) => {
      }
    );
  }

  // private updatetask() {
  //   const task = this.taskService
  //     .update(this.id, this.form.value)
  //     .pipe(first());
  //   task.subscribe(
  //     (res) => {
  //     },
  //     (error) => {
  //     }
  //   );
  // }
}
