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