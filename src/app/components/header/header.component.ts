import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() viewMode: 'table' | 'grid' = 'grid';
  @Output() viewModeToggled = new EventEmitter<void>();

  onToggleViewMode() {
    this.viewModeToggled.emit();
  }
}