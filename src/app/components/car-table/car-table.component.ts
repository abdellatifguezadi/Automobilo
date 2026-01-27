import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.css'
})
export class CarTableComponent {
  @Input() cars: Car[] = [];

  constructor(private carService: CarService) {}

  getMarqueName(marqueId: number): string {
    return this.carService.getMarqueById(marqueId)?.titre || 'Unknown';
  }
}