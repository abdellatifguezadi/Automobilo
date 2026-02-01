import { createAction, props } from '@ngrx/store';
import { Car, Marque } from '../../models/car.model';

export const loadCars = createAction('[Car] Load Cars');
export const loadCarsSuccess = createAction('[Car] Load Cars Success', props<{ cars: Car[] }>());
export const loadCarsFailure = createAction('[Car] Load Cars Failure', props<{ error: string }>());

export const loadMarques = createAction('[Car] Load Marques');
export const loadMarquesSuccess = createAction('[Car] Load Marques Success', props<{ marques: Marque[] }>());
export const loadMarquesFailure = createAction('[Car] Load Marques Failure', props<{ error: string }>());

export const loadCarById = createAction('[Car] Load Car By Id', props<{ id: number }>());
export const loadCarByIdSuccess = createAction('[Car] Load Car By Id Success', props<{ car: Car }>());
export const loadCarByIdFailure = createAction('[Car] Load Car By Id Failure', props<{ error: string }>());

export const setMarqueFilter = createAction('[Car] Set Marque Filter', props<{ marqueId: number | null }>());
export const setAvailabilityFilter = createAction('[Car] Set Availability Filter', props<{ showAvailableOnly: boolean }>());
export const setSearchQuery = createAction('[Car] Set Search Query', props<{ query: string }>());

export const createCar = createAction('[Car] Create Car', props<{ car: Omit<Car, 'id'> }>());
export const createCarSuccess = createAction('[Car] Create Car Success', props<{ car: Car}>());
export const createCarFailure = createAction('[Car] Create Car Failure', props<{ error: string }>());

export const updateCar = createAction('[Car] Update Car', props<{ id: number; car: Partial<Car> }>());
export const updateCarSuccess = createAction('[Car] Update Car Success', props<{ car: Car}>());
export const updateCarFailure = createAction('[Car] Update Car Failure', props<{ error: string}>());

export const deleteCar = createAction('[Car] Delete Car', props<{ id: number }>());
export const deleteCarSuccess = createAction('[Car] Delete Car Success', props<{ id: number }>());
export const deleteCarFailure = createAction('[Car] Delete Car Failure', props<{ error: string }>());

