import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private key = 'userName';

  getUserName(): string | null {
    return localStorage.getItem(this.key);
  }

  setUserName(name: string): void {
    localStorage.setItem(this.key, name.trim());
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
