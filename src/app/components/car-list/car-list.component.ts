import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Car, Marque } from '../../models/car.model';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CarGridComponent } from '../car-grid/car-grid.component';
import { CarTableComponent } from '../car-table/car-table.component';
import { CarFormModal } from '../car-form-modal/car-form-modal';
import * as AuthActions from '../../store/auth/auth.actions';
import * as CarActions from '../../store/cars/car.actions';
import * as CarSelectors from '../../store/cars/car.selectors';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, CarGridComponent, CarTableComponent, CarFormModal],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit, OnDestroy {
  viewMode: 'table' | 'grid' = 'grid';
  selectedMarque: number | null = null;
  showAvailableOnly = false;
  searchQuery = '';
  showModal = false;

  private destroy$ = new Subject<void>();

  cars$: Observable<Car[]>;
  marques$: Observable<Marque[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions
  ) {
    this.cars$ = this.store.select(CarSelectors.selectCars);
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.loading$ = this.store.select(CarSelectors.selectLoading);
    this.error$ = this.store.select(CarSelectors.selectError);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {
    this.store.dispatch(CarActions.loadCars());
    this.store.dispatch(CarActions.loadMarques());

    this.actions$.pipe(
      ofType(CarActions.createCarSuccess, CarActions.updateCarSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showModal = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMarqueSelected(marqueId: number | null) {
    this.store.dispatch(CarActions.setMarqueFilter({ marqueId }));
  }

  onAvailabilityToggled() {
    this.store.dispatch(CarActions.setAvailabilityFilter({ showAvailableOnly: !this.showAvailableOnly }));
    this.showAvailableOnly = !this.showAvailableOnly;
  }

  onViewModeToggled() {
    this.viewMode = this.viewMode === 'table' ? 'grid' : 'table';
  }

  onSearch() {
    this.store.dispatch(CarActions.setSearchQuery({ query: this.searchQuery }));
  }

  setAvailabilityFilter(available: boolean) {
    this.showAvailableOnly = available;
    this.store.dispatch(CarActions.setAvailabilityFilter({ showAvailableOnly: available }));
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
