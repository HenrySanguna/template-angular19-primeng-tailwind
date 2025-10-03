import { HttpClient, HttpHeaders, HttpParams, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageKey } from '../interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private readonly basePath = environment.apiBaseUrl;
  private readonly http = inject(HttpClient);

  private getHeaders(customHeaders?: HttpHeaders): HttpHeaders {
    let headers = customHeaders || new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = localStorage.getItem(StorageKey.accessToken);
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => error);
  }

  get<T>(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http
      .get<T>(`${this.basePath}${path}`, {
        headers: this.getHeaders(headers),
        params,
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(`${this.basePath}${path}`, body, {
        headers: this.getHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.basePath}${path}`, body, {
        headers: this.getHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  patch<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http
      .patch<T>(`${this.basePath}${path}`, body, {
        headers: this.getHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`${this.basePath}${path}`, {
        headers: this.getHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }
}
