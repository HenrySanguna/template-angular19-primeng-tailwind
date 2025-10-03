import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../../utils/services/toast.service';

/**
 * Guard para verificar roles de usuario.
 * Uso: { path: 'admin', canActivate: [authGuard, roleGuard], data: { roles: ['admin', 'superadmin'] } }
 * Si el usuario no tiene el rol requerido, muestra un toast y navega hacia atrás.
 * NOTA: Debe usarse siempre junto con authGuard.
 */
export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const transloco = inject(TranslocoService);

  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const userData = authService.getUserData();

  if (!userData) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = userData['role'] as string | undefined;

  if (!userRole || !requiredRoles.includes(userRole)) {
    toastService.showWarning(
      transloco.translate('ERRORS.INSUFFICIENT_PERMISSIONS')
    );
    window.history.back();
    return false;
  }

  return true;
};
