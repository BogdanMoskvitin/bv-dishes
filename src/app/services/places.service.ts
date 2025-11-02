import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceRequest, PlaceResponse } from '../models/place.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private http: HttpClient) {}

  getPlaces(): Observable<PlaceResponse[]> {
    return this.http.get<PlaceResponse[]>(`${environment.apiUrl}/places`);
  }

  getPlace(id: number): Observable<PlaceResponse> {
    return this.http.get<PlaceResponse>(`${environment.apiUrl}/places/${id}`);
  }

  createPlace(place: PlaceRequest): Observable<PlaceResponse> {
    return this.http.post<PlaceResponse>(`${environment.apiUrl}/places`, place);
  }

  updatePlace(id: number, place: Partial<PlaceRequest>): Observable<PlaceResponse> {
    return this.http.put<PlaceResponse>(`${environment.apiUrl}/places/${id}`, place);
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/places/${id}`);
  }
}
