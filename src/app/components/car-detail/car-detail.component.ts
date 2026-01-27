import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCar(id);
    }
  }

  loadCar(id: number) {
    this.carService.getCarById(id).subscribe(car => {
      this.car = car || null;
      this.loading = false;
    });
  }

  getMarqueName(): string {
    if (!this.car) return '';
    return this.carService.getMarqueById(this.car.marque_id)?.titre || 'Unknown';
  }

  goBack() {
    this.router.navigate(['/cars']);
  }
}