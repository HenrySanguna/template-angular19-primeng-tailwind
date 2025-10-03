import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  readonly isLoading = signal(false);
  private loadingCount = 0;

  show(): void {
    this.loadingCount++;
    this.isLoading.set(true);
  }

  hide(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }

    if (this.loadingCount === 0) {
      this.isLoading.set(false);
    }
  }

  forceHide(): void {
    this.loadingCount = 0;
    this.isLoading.set(false);
  }
}
