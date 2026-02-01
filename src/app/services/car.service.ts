import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, Marque } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  getMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.apiUrl}/marques`);
  }

  getMarqueById(id: number): Observable<Marque> {
    return this.http.get<Marque>(`${this.apiUrl}/marques/${id}`);
  }

  createCar(car: Omit<Car, 'id'>): Observable<Car>{
    return this.http.post<Car>(`${this.apiUrl}/cars`, car);
  }

  updateCar(id: number,car: Partial<Car>): Observable<Car>{
    return this.http.put<Car>(`${this.apiUrl}/cars/${id}`, car);
  }
}
