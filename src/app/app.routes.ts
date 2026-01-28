import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  { path: 'car/:id', component: CarDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
