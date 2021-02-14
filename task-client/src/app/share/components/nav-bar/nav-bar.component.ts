/**
 * NavBarComponent
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserEntity } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser!: UserEntity;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.pipe(first()).subscribe((res) => {
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
