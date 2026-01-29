import { createReducer, on } from '@ngrx/store';
import { Car, Marque } from '../../models/car.model';
import * as CarActions from './car.actions';

export interface CarState {
  cars: Car[];
  marques: Marque[];
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
  filters: {
    marqueId: number | null;
    showAvailableOnly: boolean;
    searchQuery: string;
  };
}

export const initialState: CarState = {
  cars: [],
  marques: [],
  selectedCar: null,
  loading: false,
  error: null,
  filters: {
    marqueId: null,
    showAvailableOnly: false,
    searchQuery: ''
  }
};

export const carReducer = createReducer(
  initialState,
  on(CarActions.loadCars, state => ({ ...state, loading: true, error: null })),
  on(CarActions.loadCarsSuccess, (state, { cars }) => ({ ...state, cars, loading: false })),
  on(CarActions.loadCarsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  
  on(CarActions.loadMarques, state => ({ ...state, loading: true, error: null })),
  on(CarActions.loadMarquesSuccess, (state, { marques }) => ({ ...state, marques, loading: false })),
  on(CarActions.loadMarquesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  
  on(CarActions.loadCarById, state => ({ ...state, loading: true, error: null })),
  on(CarActions.loadCarByIdSuccess, (state, { car }) => ({ ...state, selectedCar: car, loading: false })),
  on(CarActions.loadCarByIdFailure, (state, { error }) => ({ ...state, error, loading: false })),
  
  on(CarActions.setMarqueFilter, (state, { marqueId }) => ({ ...state, filters: { ...state.filters, marqueId } })),
  on(CarActions.setAvailabilityFilter, (state, { showAvailableOnly }) => ({ ...state, filters: { ...state.filters, showAvailableOnly } })),
  on(CarActions.setSearchQuery, (state, { query }) => ({ ...state, filters: { ...state.filters, searchQuery: query } }))
);