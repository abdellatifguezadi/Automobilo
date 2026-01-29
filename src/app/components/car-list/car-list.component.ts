import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Car, Marque } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CarGridComponent } from '../car-grid/car-grid.component';
import { CarTableComponent } from '../car-table/car-table.component';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, CarGridComponent, CarTableComponent],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  marques: Marque[] = [];
  filteredCars: Car[] = [];
  viewMode: 'table' | 'grid' = 'grid';
  selectedMarque: number | null = null;
  showAvailableOnly = false;
  searchQuery = '';

  constructor(
    private carService: CarService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.loadCars();
    this.loadMarques();
  }

  loadCars() {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
      this.applyFilters();
    });
  }

  loadMarques() {
    this.carService.getMarques().subscribe(marques => {
      this.marques = marques;
    });
  }

  onMarqueSelected(marqueId: number | null) {
    this.selectedMarque = marqueId;
    this.applyFilters();
  }

  onAvailabilityToggled() {
    this.showAvailableOnly = !this.showAvailableOnly;
    this.applyFilters();
  }

  onViewModeToggled() {
    this.viewMode = this.viewMode === 'table' ? 'grid' : 'table';
  }

  onSearch() {
    this.applyFilters();
  }

  setAvailabilityFilter(available: boolean) {
    this.showAvailableOnly = available;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const marqueMatch = !this.selectedMarque || car.marque_id === this.selectedMarque;
      const availabilityMatch = !this.showAvailableOnly || car.disponibilite;

      const searchLower = this.searchQuery.toLowerCase();
      const marqueNom = this.carService.getMarqueById(car.marque_id)?.titre.toLowerCase() || '';
      const searchMatch = !this.searchQuery ||
        marqueNom.includes(searchLower) ||
        car.modele.toLowerCase().includes(searchLower) ||
        car.carburant.toLowerCase().includes(searchLower);

      return marqueMatch && availabilityMatch && searchMatch;
    });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
