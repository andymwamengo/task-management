/**
 * AuthInterceptor
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
   Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;

    if (isLoggedIn) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
                'Content-Type': 'application/json'
            }
        });
    }
    return next.handle(request);
  }
}

