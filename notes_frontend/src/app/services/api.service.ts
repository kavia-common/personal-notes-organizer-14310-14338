import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * ApiService centralizes HTTP requests to the backend. It prefixes
 * routes with the configured API base URL and attaches auth headers when present.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private get baseUrl(): string {
    return environment.apiBaseUrl?.replace(/\/+$/, '') || '';
  }

  // PUBLIC_INTERFACE
  /** Build a full URL by prefixing with API base URL. */
  url(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }

  private headers(): HttpHeaders {
    const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
    const ls: any = g.localStorage as any;
    const token = ls && typeof ls.getItem === 'function' ? ls.getItem('auth_token') : null;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Observable<T> {
    return this.http.get<T>(this.url(path), { headers: this.headers(), params: params as any })
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body?: unknown): Observable<T> {
    return this.http.post<T>(this.url(path), body ?? {}, { headers: this.headers() })
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, body?: unknown): Observable<T> {
    return this.http.put<T>(this.url(path), body ?? {}, { headers: this.headers() })
      .pipe(catchError(this.handleError));
  }

  patch<T>(path: string, body?: unknown): Observable<T> {
    return this.http.patch<T>(this.url(path), body ?? {}, { headers: this.headers() })
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.url(path), { headers: this.headers() })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    const message = err.error?.message || err.message || 'Unknown error';
    console.error('[API ERROR]', err);
    return throwError(() => new Error(message));
  }
}
