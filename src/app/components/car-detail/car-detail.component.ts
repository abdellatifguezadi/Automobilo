import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Car, Marque } from '../../models/car.model';
import * as CarActions from '../../store/cars/car.actions';
import * as CarSelectors from '../../store/cars/car.selectors';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private marques: Marque[] = [];

  car$: Observable<Car | null>;
  marques$: Observable<Marque[]>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.car$ = this.store.select(CarSelectors.selectSelectedCar);
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.loading$ = this.store.select(CarSelectors.selectLoading);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(CarActions.loadCarById({ id }));
      this.store.dispatch(CarActions.loadMarques());
    }
    
    // Subscribe to marques for getting marque name
    this.marques$.pipe(takeUntil(this.destroy$)).subscribe(marques => {
      this.marques = marques;
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMarqueName(): Observable<string> {
    return combineLatest([this.car$, this.marques$]).pipe(
      map(([car, marques]) => {
        if (!car) return '';
        const marque = marques.find(m => m.id === car.marque_id);
        return marque?.titre || 'Unknown';
      })
    );
  }

  goBack() {
    this.router.navigate(['/cars']);
  }
}