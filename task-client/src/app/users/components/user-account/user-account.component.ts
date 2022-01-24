/**
 * UserAccountComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../models/user.model';
import { AuthService } from '../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TaskService } from '../../../tasks/service/task.service';
import { TaskEntity } from 'src/app/models/task.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  user: UserEntity;


  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.currentUserValue){
      this.authService.getAuthStatus().pipe(first()).subscribe(
        (res: UserEntity) => {
          this.user = res;
        },
        _error => {
        }
      );
    }else{
      this.router.navigate(['/tasks']);
    }
  }

  deleteUserAccount(user: UserEntity): void {
    const userd = this.authService.deleteUser(user.id).pipe(first());
    userd.subscribe(
      (_res) => {
      },
      (_error) => {
      }
    );
  }


  deleteTask(task: TaskEntity): void{
    const taskd = this.taskService.deleteTask(task.id).pipe(first());
    taskd.subscribe(
      _res => {
      },
      _error => {
      }
    );
  }
}
