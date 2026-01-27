import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-grid.component.html',
  styleUrl: './car-grid.component.css'
})
export class CarGridComponent {
  @Input() cars: Car[] = [];

  constructor(private carService: CarService) {}

  getMarqueName(marqueId: number): string {
    return this.carService.getMarqueById(marqueId)?.titre || 'Unknown';
  }
}