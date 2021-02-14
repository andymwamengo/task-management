/**
 * NavBarComponent
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserEntity } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser!: UserEntity;

  constructor(private authService: AuthService) {
    this.authService.currentUser.pipe(first()).subscribe(() => {
      this.authService.getAuthStatus().subscribe((user: UserEntity) => {
        this.currentUser = user;
      });
    });
  }

  ngOnInit(): void {}

  userLogout(): void {
    this.authService.logoutUser();
  }
}
