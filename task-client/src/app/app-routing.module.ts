/**
 * App Routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { TasksComponent } from './tasks/components/tasks/tasks.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { UserAccountComponent } from './users/components/user-account/user-account.component';
import { CreateTaskComponent } from './tasks/components/create-task/create-task.component';
import { TaskEditComponent } from './tasks/components/task-edit/task-edit.component';
import { UserEditComponent } from './users/components/user-edit/user-edit.component';
import { TaskDetailsComponent } from './tasks/components/task-details/task-details.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { UsersComponent } from './users/components/users/users.component';

const routes: Routes = [
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { title: 'Register User' },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { title: 'Login User' },
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Users Page' },
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Update' },
  },
  {
    path: 'user/account',
    component: UserAccountComponent,
    data: { title: 'User Account' },
  },
  {
    path: 'user/details/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Details' },
  },
  {
    path: 'tasks',
    component: TasksComponent,
    data: { title: 'Task Page' },
  },
  {
    path: 'task/create',
    component: CreateTaskComponent,
    canActivate: [AuthGuard],
    data: { title: 'Create Task' },
  },
  {
    path: 'task/edit/:id',
    component: TaskEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Update Task' },
  },
  {
    path: 'task/details/:id',
    component: TaskDetailsComponent,
    data: { title: 'Task Details' },
  },
  {
    path: '',
    component: TasksComponent,
    data: { title: 'Tasks Page' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
