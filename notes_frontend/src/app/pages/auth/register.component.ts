import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./auth.css']
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { email: '', password: '', displayName: '' };
  loading = false;
  error: string | null = null;

  submit() {
    this.loading = true;
    this.error = null;
    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => { this.error = e.message || 'Registration failed'; this.loading = false; }
    });
  }
}
