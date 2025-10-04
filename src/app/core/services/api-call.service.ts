import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private readonly basePath = environment.apiBaseUrl;
  private readonly http = inject(HttpClient);

  private getHeaders(customHeaders?: HttpHeaders): HttpHeaders {
    return customHeaders || new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get<T>(path: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.basePath}${path}`, {
      headers: this.getHeaders(headers),
      params,
    });
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.basePath}${path}`, body, {
      headers: this.getHeaders(headers),
    });
  }

  put<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.basePath}${path}`, body, {
      headers: this.getHeaders(headers),
    });
  }

  patch<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.basePath}${path}`, body, {
      headers: this.getHeaders(headers),
    });
  }

  delete<T>(path: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.basePath}${path}`, {
      headers: this.getHeaders(headers),
    });
  }
}
