import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/auth/register.component').then(m => m.RegisterComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  { path: '**', redirectTo: '' }
];
