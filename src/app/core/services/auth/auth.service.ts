import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { StorageKey, UserData } from '../../interfaces/storage';
import {
  DataLogin,
  EmailCheckResponse,
  LoginResponse,
  PasswordResetConfirmation,
  PasswordResetRequest,
  RefreshTokenResponse
} from '../../interfaces/auth';
import { ApiCallService } from '../api-call.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly basePath = '/auth';

  private readonly apiCallService = inject(ApiCallService);
  private readonly router = inject(Router);

  // Signals
  private readonly accessTokenSignal = signal<string | null>(this.getFromStorage(StorageKey.accessToken));
  private readonly refreshTokenSignal = signal<string | null>(this.getFromStorage(StorageKey.refreshToken));
  private readonly userDataSignal = signal<UserData | null>(this.getFromStorage(StorageKey.userData, true));

  // Computed signals
  readonly isAuthenticated = computed(() => !!this.accessTokenSignal());
  readonly userData = computed(() => this.userDataSignal());
  readonly hasValidToken = computed(() => {
    const token = this.accessTokenSignal();
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    const tokenExpiration = decodedToken.exp * 1000;
    return Date.now() < tokenExpiration;
  });

  // Storage helpers
  private getFromStorage<T = string>(key: StorageKey, parse = false): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return parse ? JSON.parse(value) : value as T;
  }

  private setInStorage(key: StorageKey, value: any): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  private removeFromStorage(key: StorageKey): void {
    localStorage.removeItem(key);
  }

  private clearStorage(): void {
    Object.values(StorageKey).forEach(key => this.removeFromStorage(key as StorageKey));
  }

  login(credentials: DataLogin): Observable<boolean> {
    return this.apiCallService.post<LoginResponse>(`${this.basePath}/login`, credentials).pipe(
      map((response) => {
        const { token, refreshToken, user } = response.data;

        this.setInStorage(StorageKey.accessToken, token);
        this.setInStorage(StorageKey.refreshToken, refreshToken);
        this.setInStorage(StorageKey.userData, user);

        this.accessTokenSignal.set(token);
        this.refreshTokenSignal.set(refreshToken);
        this.userDataSignal.set(user);

        return true;
      }),
      catchError((error) => {
        console.error('Error en login:', error.message);
        return throwError(() => error);
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    const payload: PasswordResetRequest = {
      email,
      platform: 'web',
      appScheme: 'template-angular19',
    };

    return this.apiCallService.post(`${this.basePath}/resetPasswordEmail`, payload).pipe(
      catchError((error) => {
        console.error('Error en recoverPassword:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearStorage();
    this.accessTokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.userDataSignal.set(null);
    this.router.navigate(['/login']);
  }

  checkTokenValidity(): boolean {
    return this.hasValidToken();
  }

  register(formData: any): Observable<any> {
    return this.apiCallService.post(`${this.basePath}/register`, formData).pipe(
      catchError((error) => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  confirmPasswordReset(token: string, newPassword: string): Observable<any> {
    const payload: PasswordResetConfirmation = { token, password: newPassword };

    return this.apiCallService.post(`${this.basePath}/setNewPassword`, payload).pipe(
      catchError((error) => {
        console.error('Error al confirmar restablecimiento de contraseña:', error);
        return throwError(() => error);
      })
    );
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    if (!this.accessTokenSignal()) {
      return throwError(() => new Error('Token no disponible'));
    }

    return this.apiCallService.post(
      `${this.basePath}/updatePassword`,
      { oldPassword, newPassword }
    ).pipe(
      catchError((error) => {
        console.error('Error al actualizar contraseña:', error);
        return throwError(() => error);
      })
    );
  }

  deleteAccount(): Observable<any> {
    const userData = this.userDataSignal();

    if (!userData?.id) {
      return throwError(() => new Error('Datos de usuario no disponibles'));
    }

    return this.apiCallService.delete(`/user/${userData.id}`).pipe(
      map(() => {
        this.logout();
        return true;
      }),
      catchError((error) => {
        console.error('Error al eliminar cuenta:', error);
        return throwError(() => error);
      })
    );
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.apiCallService.post<EmailCheckResponse>(`${this.basePath}/emailExists`, { email }).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error al verificar email:', error);
        return of(false);
      })
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.refreshTokenSignal();

    if (!refreshToken) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Refresh token no disponible'));
    }

    return this.apiCallService.post<RefreshTokenResponse>(
      `${this.basePath}/refreshToken`,
      { refreshToken }
    ).pipe(
      map((response) => {
        const newToken = response.data.access_token;

        this.setInStorage(StorageKey.accessToken, newToken);
        this.accessTokenSignal.set(newToken);

        return newToken;
      }),
      catchError((error) => {
        console.error('Error al refrescar token:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getUserData(): UserData | null {
    return this.userDataSignal();
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return {};
    }
  }
}
