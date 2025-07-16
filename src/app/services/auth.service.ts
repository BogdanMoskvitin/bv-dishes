import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // адрес твоего бэка

  constructor(private http: HttpClient) {}

  createUser(userName: string) {
    return this.http.post(`${this.apiUrl}/user`, {userName});
  }
}
