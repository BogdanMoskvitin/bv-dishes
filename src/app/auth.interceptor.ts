import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userName = this.userService.getUserName();

    if (userName) {
      const encodedName = encodeURIComponent(userName);
      request = request.clone({
        setHeaders: {
          Authorization: encodedName
        }
      });
    }

    return next.handle(request);
  }
}
