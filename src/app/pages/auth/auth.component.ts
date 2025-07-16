import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private router: Router, 
    private userService: UserService,
  ) { }

  login(name: string) {
    this.userService.setUserName(name);
    this.router.navigate(['/dishes']);
  }
}
