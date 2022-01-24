/**
 * UserEditComponent
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../servces/users.service';
import { UserEntity } from '../../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  editAccountForm!: FormGroup;
  loading = false;
  submitted = false;
  error!: any;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.editAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userId = this.router.snapshot.params.id;
    const resp = this.usersService.getUserById(this.userId).pipe(first());
    resp.subscribe(
      (res: UserEntity) => {
        this.editAccountForm.patchValue(res);
      },
      (error) => {
      }
    );
  }

  // access to form fields
  get f(): any {
    return this.editAccountForm.controls;
  }

  updateAccount(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editAccountForm.invalid) {
      return;
    }
    if (this.editAccountForm.valid) {
      this.authService
        .updateUser(this.userId, this.editAccountForm.value).pipe(first())
        .subscribe(
          (res: any) => {
            this.route.navigate(['/user/account']);
          },
          (error: any) => {
            this.error = error;
          }
        );
    }
  }
}
