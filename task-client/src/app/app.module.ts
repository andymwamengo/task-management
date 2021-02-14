/**
 * App Module
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { TasksComponent } from './tasks/components/tasks/tasks.component';
import { CreateTaskComponent } from './tasks/components/create-task/create-task.component';
import { TaskDetailsComponent } from './tasks/components/task-details/task-details.component';
import { UsersComponent } from './users/components/users/users.component';
import { UserAccountComponent } from './users/components/user-account/user-account.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { FooterComponent } from './share/components/footer/footer.component';
import { NavBarComponent } from './share/components/nav-bar/nav-bar.component';
import { UserEditComponent } from './users/components/user-edit/user-edit.component';
import { TaskEditComponent } from './tasks/components/task-edit/task-edit.component';
import { DialogComponent } from './share/components/dialog/dialog.component';

import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth/service/auth.service';
import { TaskService } from './tasks/service/task.service';
import { UsersService } from './users/servces/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TasksComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    UsersComponent,
    UserAccountComponent,
    UserDetailsComponent,
    FooterComponent,
    NavBarComponent,
    UserEditComponent,
    TaskEditComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Title,
    AuthService,
    TaskService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
