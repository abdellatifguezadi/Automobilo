import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Marque } from '../../models/car.model';
import * as CarSelectors from '../../store/cars/car.selectors';
import * as CarActions from '../../store/cars/car.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  marques$: Observable<Marque[]>;
  selectedMarque$: Observable<number | null>;
  showAvailableOnly$: Observable<boolean>;

  constructor(private store: Store) {
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.selectedMarque$ = this.store.select(CarSelectors.selectSelectedMarque);
    this.showAvailableOnly$ = this.store.select(CarSelectors.selectShowAvailableOnly);
  }

  onMarqueClick(marqueId: number | null) {
    this.store.dispatch(CarActions.setMarqueFilter({ marqueId }));
  }
}
