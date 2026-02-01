import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { of, Subject } from 'rxjs';
import { CarListComponent } from './car-list.component';
import * as CarActions from '../../store/cars/car.actions';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockActions$: any;

  beforeEach(async () => {
    mockStore = {
      select: vi.fn().mockReturnValue(of([])),
      dispatch: vi.fn()
    };
    mockRouter = { navigate: vi.fn() };
    mockActions$ = { pipe: vi.fn().mockReturnValue(of({})) };

    await TestBed.configureTestingModule({
      imports: [CarListComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: Actions, useValue: mockActions$ }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.viewMode).toBe('grid');
    expect(component.selectedMarque).toBeNull();
    expect(component.showAvailableOnly).toBe(false);
    expect(component.searchQuery).toBe('');
    expect(component.showModal).toBe(false);
  });

  it('should dispatch loadCars and loadMarques on ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(CarActions.loadCars());
    expect(mockStore.dispatch).toHaveBeenCalledWith(CarActions.loadMarques());
  });

  it('should toggle view mode', () => {
    component.viewMode = 'grid';
    component.onViewModeToggled();
    expect(component.viewMode).toBe('table');

    component.onViewModeToggled();
    expect(component.viewMode).toBe('grid');
  });

  it('should dispatch search action', () => {
    component.searchQuery = 'Toyota';
    component.onSearch();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CarActions.setSearchQuery({ query: 'Toyota' })
    );
  });

  it('should set availability filter', () => {
    component.setAvailabilityFilter(true);
    expect(component.showAvailableOnly).toBe(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      CarActions.setAvailabilityFilter({ showAvailableOnly: true })
    );
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);

    component.closeModal();
    expect(component.showModal).toBe(false);
  });
});
