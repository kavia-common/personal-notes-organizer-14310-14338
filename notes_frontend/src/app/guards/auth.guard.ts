import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Route guard to ensure routes are accessed only by authenticated users.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticatedSignal()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
