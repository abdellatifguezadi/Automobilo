import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CarService } from '../../services/car.service';
import * as CarActions from './car.actions';

@Injectable()
export class CarEffects {
  private actions$ = inject(Actions);
  private carService = inject(CarService);

  loadCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCars),
      switchMap(() =>
        this.carService.getCars().pipe(
          map(cars => CarActions.loadCarsSuccess({cars})),
          catchError(error => of(CarActions.loadCarsFailure({error: error.message})))
        )
      )
    )
  );

  loadMarques$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadMarques),
      switchMap(() =>
        this.carService.getMarques().pipe(
          map(marques => CarActions.loadMarquesSuccess({marques})),
          catchError(error => of(CarActions.loadMarquesFailure({error: error.message})))
        )
      )
    )
  );

  loadCarById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCarById),
      switchMap(({id}) =>
        this.carService.getCarById(id).pipe(
          map(car => CarActions.loadCarByIdSuccess({car})),
          catchError(error => of(CarActions.loadCarByIdFailure({error: error.message})))
        )
      )
    )
  );

  createCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.createCar),
      switchMap(({car}) =>
        this.carService.createCar(car).pipe(
          map(createdCar => CarActions.createCarSuccess({car: createdCar})),
          catchError(error => of(CarActions.createCarFailure({error: error.message})))
        )
      )
    )
  );
}
