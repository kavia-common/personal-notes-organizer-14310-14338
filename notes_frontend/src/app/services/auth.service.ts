import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { AuthResponse, Credentials, RegisterPayload, User } from '../models/auth.model';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * AuthService handles authentication related operations and stores
 * token and user in localStorage. Uses Angular signals to expose state.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  userSignal = signal<User | null>(this.readUser());
  isAuthenticatedSignal = signal<boolean>(!!this.readToken());

  constructor(private api: ApiService) {}

  private readToken(): string | null {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const ls: any = g.localStorage as any;
    return ls && typeof ls.getItem === 'function' ? ls.getItem(this.TOKEN_KEY) : null;
  }
  private readUser(): User | null {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const ls: any = g.localStorage as any;
    const raw = ls && typeof ls.getItem === 'function' ? ls.getItem(this.USER_KEY) : null;
    try { return raw ? JSON.parse(raw) as User : null; } catch { return null; }
  }

  private persist(auth: AuthResponse) {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const ls: any = g.localStorage as any;
    if (ls && typeof ls.setItem === 'function') {
      ls.setItem(this.TOKEN_KEY, auth.token);
      ls.setItem(this.USER_KEY, JSON.stringify(auth.user));
    }
    this.userSignal.set(auth.user);
    this.isAuthenticatedSignal.set(true);
  }

  // PUBLIC_INTERFACE
  /** Perform login with credentials and persist session. */
  login(payload: Credentials): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', payload)
      .pipe(tap((res) => this.persist(res)));
  }

  // PUBLIC_INTERFACE
  /** Register a new user and persist session. */
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/register', payload)
      .pipe(tap((res) => this.persist(res)));
  }

  // PUBLIC_INTERFACE
  /** Logout and clear session state. */
  logout(): Observable<void> {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const ls: any = g.localStorage as any;
    if (ls && typeof ls.removeItem === 'function') {
      ls.removeItem(this.TOKEN_KEY);
      ls.removeItem(this.USER_KEY);
    }
    this.userSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    // optionally call backend logout endpoint
    return of(void 0);
  }
}
