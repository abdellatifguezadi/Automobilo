import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() viewMode: 'table' | 'grid' = 'grid';
  @Input() showViewToggle: boolean = true;
  @Output() viewModeToggled = new EventEmitter<void>();
  
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {}

  onToggleViewMode() {
    this.viewModeToggled.emit();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}