import { Component, OnInit, Output, EventEmitter, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car, Marque } from '../../models/car.model';
import * as CarActions from '../../store/cars/car.actions';
import * as CarSelectors from '../../store/cars/car.selectors';

@Component({
  selector: 'app-car-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-form-modal.html',
  styleUrl: './car-form-modal.css'
})
export class CarFormModal implements OnInit {
  @Input() carToEdit: Car | null = null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  isEditMode = false;

  carForm!: FormGroup;
  marques$: Observable<Marque[]>;
  loading$: Observable<boolean>;

  constructor() {
    this.marques$ = this.store.select(CarSelectors.selectMarques);
    this.loading$ = this.store.select(CarSelectors.selectLoading);
  }

  ngOnInit() {
    this.initForm();

    if (this.carToEdit) {
      this.isEditMode = true;
      this.carForm.patchValue({
        marque_id: this.carToEdit.marque_id,
        modele: this.carToEdit.modele,
        prix: this.carToEdit.prix,
        carburant: this.carToEdit.carburant,
        image: this.carToEdit.image,
        disponibilite: this.carToEdit.disponibilite,
        dateDeMiseEnVente: this.carToEdit.dateDeMiseEnVente
      });
    }
  }

  private initForm() {
    this.carForm = this.fb.group({
      marque_id: ['', [Validators.required]],
      modele: ['', [Validators.required, Validators.minLength(2)]],
      prix: ['', [Validators.required, Validators.min(1)]],
      carburant: ['', [Validators.required]],
      image: ['', [Validators.required]],
      disponibilite: [true],
      dateDeMiseEnVente: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      const carData = {
        ...this.carForm.value,
        marque_id: Number(this.carForm.value.marque_id),
        prix: Number(this.carForm.value.prix)
      };

      if (this.isEditMode && this.carToEdit) {
        this.store.dispatch(CarActions.updateCar({ id: this.carToEdit.id, car: carData }));
      } else {
        this.store.dispatch(CarActions.createCar({ car: carData }));
      }

      this.close.emit();
    } else {
      this.markFormGroupTouched(this.carForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  onClose() {
    this.close.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.carForm.get(fieldName);

    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }

    if (control?.hasError('min')) {
      return 'La valeur doit être positive';
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.carForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
