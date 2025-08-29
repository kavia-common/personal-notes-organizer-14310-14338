import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  query = signal('');
  auth = inject(AuthService);
  user = computed(() => this.auth.userSignal());

  onSearch() {
    this.search.emit(this.query());
  }

  logout() {
    this.auth.logout().subscribe();
  }
}
