import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../utils/services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'errors.unknown';

      switch (err.status) {
        case 0:
          errorMessage = 'errors.network';
          break;
        case 400:
          errorMessage = err.error?.message || 'errors.bad-request';
          break;
        case 401:
          errorMessage = 'errors.unauthorized';
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'errors.forbidden';
          break;
        case 404:
          errorMessage = 'errors.not-found';
          break;
        case 500:
          errorMessage = 'errors.server-error';
          break;
        case 503:
          errorMessage = 'errors.service-unavailable';
          break;
        default:
          errorMessage = err.error?.message || err.message || 'errors.unknown';
      }

      if (err.status !== 401) {
        toastService.showError(errorMessage);
      }

      return throwError(() => err);
    })
  );
};
