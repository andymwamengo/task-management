/**
 * UsersService
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(
      `${environment.apiUrl}/users/results`).pipe(shareReplay(1));
  }

  getUserById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(
      `${environment.apiUrl}/users/find/${id}`).pipe(shareReplay(1));
  }
}
