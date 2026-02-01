import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Car, Marque } from '../../models/car.model';
import { CarFormModal } from '../car-form-modal/car-form-modal';
import { HeaderComponent } from '../header/header.component';
import * as CarActions from '../../store/cars/car.actions';
import * as CarSelectors from '../../store/cars/car.selectors';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CarFormModal, HeaderComponent],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  car$: Observable<Car | null>;
  marques$: Observable<Marque[]>;
  loading$: Observable<boolean>;
  marqueName$: Observable<string>;
  isAuthenticated$: Observable<boolean>;

  showModal = false;
  carToEdit: Car | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.car$ = this.store.select(CarSelectors.selectSelectedCar);
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.loading$ = this.store.select(CarSelectors.selectLoading);
    this.marqueName$ = this.store.select(CarSelectors.selectSelectedCarMarqueName);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(CarActions.loadCarById({ id }));
      this.store.dispatch(CarActions.loadMarques());
    }


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.router.navigate(['/cars']);
  }

  updateCar(car: Car) {
    this.carToEdit = car;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.carToEdit = null;
  }

  deleteCar() {
    console.log('Delete car');
  }
}
