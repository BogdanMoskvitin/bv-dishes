import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const userName = this.userService.getUserName();

    if (userName) {
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
