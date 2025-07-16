import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishRequest, DishResponse } from '../models/dish.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  constructor(private http: HttpClient) {}

  getDishes(): Observable<DishResponse[]> {
    return this.http.get<DishResponse[]>(`${environment.apiUrl}/dishes`);
  }

  getDish(id: number): Observable<DishResponse> {
    return this.http.get<DishResponse>(`${environment.apiUrl}/dishes/${id}`);
  }

  createDish(dish: DishRequest): Observable<DishResponse> {
    return this.http.post<DishResponse>(`${environment.apiUrl}/dishes`, dish);
  }

  updateDish(id: number, dish: Partial<DishRequest>): Observable<DishResponse> {
    return this.http.put<DishResponse>(`${environment.apiUrl}/dishes/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/dishes/${id}`);
  }
}
