import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car, Marque } from '../../models/car.model';
import * as CarSelectors from '../../store/cars/car.selectors';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-car-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-grid.component.html',
  styleUrl: './car-grid.component.css'
})
export class CarGridComponent implements OnInit {
  cars$: Observable<Car[]>;
  marques$: Observable<Marque[]>;
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) {
    this.cars$ = this.store.select(CarSelectors.selectFilteredCars);
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {}

  getMarqueName(marqueId: number, marques: Marque[]): string {
    return marques.find(marque => marque.id === marqueId)?.titre || 'Unknown';
  }

  updateCar(carId: number) {
    console.log('Update car:', carId);
  }

  deleteCar(carId: number) {
    console.log('Delete car:', carId);
  }
}