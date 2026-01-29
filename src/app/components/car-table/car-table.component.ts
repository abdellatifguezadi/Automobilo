import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car, Marque } from '../../models/car.model';
import * as CarSelectors from '../../store/cars/car.selectors';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.css'
})
export class CarTableComponent implements OnInit {
  cars$: Observable<Car[]>;
  marques$: Observable<Marque[]>;

  constructor(private store: Store) {
    this.cars$ = this.store.select(CarSelectors.selectFilteredCars);
    this.marques$ = this.store.select(CarSelectors.selectMarques);
  }

  ngOnInit() {}

  getMarqueName(marqueId: number, marques: Marque[]): string {
    return marques.find(marque => marque.id === marqueId)?.titre || 'Unknown';
  }
}