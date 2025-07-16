import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishRequest, DishResponse } from '../models/dish.interface';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private apiUrl = 'http://localhost:3000';  // адрес твоего бэка

  constructor(private http: HttpClient) {}

  getDishes(): Observable<DishResponse[]> {
    return this.http.get<DishResponse[]>(`${this.apiUrl}/dishes`);
  }

  getDish(id: number): Observable<DishResponse> {
    return this.http.get<DishResponse>(`${this.apiUrl}/dishes/${id}`);
  }

  createDish(dish: DishRequest): Observable<DishResponse> {
    return this.http.post<DishResponse>(`${this.apiUrl}/dishes`, dish);
  }

  updateDish(id: number, dish: Partial<DishRequest>): Observable<DishResponse> {
    return this.http.put<DishResponse>(`${this.apiUrl}/dishes/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dishes/${id}`);
  }
}
