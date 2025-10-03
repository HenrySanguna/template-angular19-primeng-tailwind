import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

/**
 * Guard para proteger rutas que requieren autenticación.
 * Verifica:
 * 1. Si el usuario está autenticado (signal)
 * 2. Si el token es válido (no expirado)
 * 3. Si el token está expirado, intenta refrescarlo
 * 4. Si no hay token o falla el refresh, redirige a login
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  if (authService.hasValidToken()) {
    return true;
  }

  return authService.refreshToken().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return of(false);
    })
  );
};
