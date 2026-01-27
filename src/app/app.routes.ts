import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'car/:id', component: CarDetailComponent },
  { path: '**', redirectTo: '/cars' }
];
