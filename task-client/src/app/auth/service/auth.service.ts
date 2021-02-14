/**
 * Auth Service
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../models/user.model';
import { UserLogin } from '../../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** The currentUser Subject for user data storage */
  private currentUserSubject: BehaviorSubject<UserEntity>;
  public currentUser: Observable<UserEntity>;

  // userLocal: any = localStorage.getItem('currentUser');

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserEntity>(
     JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserEntity {
    return this.currentUserSubject.value;
  }

  /** Login method to server API for Authorization */
  public loginUser(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, user).pipe(
      map((response: UserEntity) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }),
    shareReplay(1));
  }

  /** Logout user from the server and blacklist token */
  logoutUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/tasks']);
    // window.location.reload();
  }

  registerUser(user: UserEntity): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/auth/register`, user).pipe(shareReplay(1));
  }


  getAuthStatus(): Observable<UserEntity>{
    return this.http.get<UserEntity>(`
    ${environment.apiUrl}/auth/status/`).pipe(shareReplay(1));
  }

  updateUser(id: number, params: any): Observable<any> {
    return this.http
      .patch(`${environment.apiUrl}/users/update/${id}`, params)
      .pipe(
        map((x) => {
          if (id === this.currentUserValue.id) {
            const user = { ...this.currentUser, ...params };
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return x;
        }),
      shareReplay(1));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/delete/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id === this.currentUserValue.id) {
          this.logoutUser();
        }
        return x;
      }),
    shareReplay(1));
  }
}
