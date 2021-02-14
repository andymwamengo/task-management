/**
 * Users Component
 */
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../servces/users.service';
import { UserEntity } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$?: Observable<UserEntity[]>;
  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [3, 6, 9, 12];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.users$ = this.usersService.getAllUsers().pipe(first());
  }

  onPageDataChange(event: any): void {
    this.page = event;
    this.fetchUsers();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.fetchUsers();
  }
}
