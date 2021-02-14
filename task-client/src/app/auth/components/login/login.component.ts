/**
 * LoginComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { UserEntity } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/user/account']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams.returnUrl || '/user/account';
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.authService.loginUser(this.loginForm.value).pipe(first());
    user.subscribe(
      (res) => {
        this.authService.getAuthStatus().subscribe(
          (userR: UserEntity) => {
            if (userR.role === 'normal') {
              this.router.navigate([this.returnUrl]);
            }
          },
          (error) => {
            this.error = error;
          }
        );
      },
      (error) => {
        this.error = error;
        this.loading = false;
        console.log(error);
      }
    );
  }
}
