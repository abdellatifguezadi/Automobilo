import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marque } from '../../models/car.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() marques: Marque[] = [];
  @Input() selectedMarque: number | null = null;
  @Input() showAvailableOnly = false;

  @Output() marqueSelected = new EventEmitter<number | null>();
  @Output() availabilityToggled = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onMarqueClick(marqueId: number | null) {
    this.marqueSelected.emit(marqueId);
  }

  onAvailabilityToggle() {
    this.availabilityToggled.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
