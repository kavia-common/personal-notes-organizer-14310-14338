import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./auth.css']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  form = { email: '', password: '' };
  loading = false;
  error: string | null = null;

  submit() {
    this.loading = true;
    this.error = null;
    this.auth.login(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => { this.error = e.message || 'Login failed'; this.loading = false; }
    });
  }
}
