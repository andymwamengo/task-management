/**
 * UserDetailsComponent
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../servces/users.service';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user$?: Observable<UserEntity>;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId: any = this.route.snapshot.paramMap.get('id');
    this.user$ = this.userService.getUserById(userId).pipe(first());
  }
}
