/**
 * RegisterComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): any {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const user = this.authService.registerUser(this.registerForm.value);
    user.subscribe(
      (res) => {
        console.log('User', res);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  // private updateUser() {
  //   const user = this.authService
  //     .update(this.id, this.form.value)
  //     .pipe(first());
  //   user.subscribe(
  //     (res) => {
  //       console.log('User', res);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}