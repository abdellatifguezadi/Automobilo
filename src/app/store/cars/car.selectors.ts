import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarState } from './car.reducer';

export const selectCarState = createFeatureSelector<CarState>('cars');

export const selectCars = createSelector(selectCarState, state => state.cars);
export const selectMarques = createSelector(selectCarState, state => state.marques);
export const selectSelectedCar = createSelector(selectCarState, state => state.selectedCar);
export const selectLoading = createSelector(selectCarState, state => state.loading);
export const selectError = createSelector(selectCarState, state => state.error);
export const selectFilters = createSelector(selectCarState, state => state.filters);

export const selectFilteredCars = createSelector(
  selectCars,
  selectMarques,
  selectFilters,
  (cars, marques, filters) => {
    return cars.filter(car => {
      const marqueMatch = !filters.marqueId || car.marque_id === filters.marqueId;
      const availabilityMatch = !filters.showAvailableOnly || car.disponibilite;
      const searchLower = filters.searchQuery.toLowerCase();
      const marqueNom = marques.find(m => m.id === car.marque_id)?.titre.toLowerCase() || '';
      const searchMatch = !filters.searchQuery ||
        marqueNom.includes(searchLower) ||
        car.modele.toLowerCase().includes(searchLower) ||
        car.carburant.toLowerCase().includes(searchLower);

      return marqueMatch && availabilityMatch && searchMatch;
    });
  }
);

export const selectSelectedCarMarqueName = createSelector(
  selectSelectedCar,
  selectMarques,
  (car, marques) => {
    if (!car) return '';
    return marques.find(m => m.id === car.marque_id)?.titre || 'Unknown';
  }
);

export const selectSelectedMarque = createSelector(
  selectFilters,
  filters => filters.marqueId
);

export const selectShowAvailableOnly = createSelector(
  selectFilters,
  filters => filters.showAvailableOnly
);
