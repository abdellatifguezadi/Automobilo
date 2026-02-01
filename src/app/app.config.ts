import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducer';
import { CarEffects } from './store/cars/car.effects';
import { carReducer } from './store/cars/car.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      timeOut: 0,
      positionClass: 'toast-top-right',
      closeButton: true,
      preventDuplicates: true
    }),
    provideStore({
      auth: authReducer,
      cars: carReducer
    }),
    provideEffects([AuthEffects, CarEffects])
  ]
};
