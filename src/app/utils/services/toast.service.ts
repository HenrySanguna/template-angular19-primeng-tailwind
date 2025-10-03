import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  private show(severity: ToastSeverity, summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life
    });
  }

  showSuccess(summary: string, detail?: string, life: number = 3000): void {
    this.show('success', summary, detail, life);
  }

  showError(summary: string, detail?: string, life: number = 5000): void {
    this.show('error', summary, detail, life);
  }

  showWarning(summary: string, detail?: string, life: number = 4000): void {
    this.show('warn', summary, detail, life);
  }

  showInfo(summary: string, detail?: string, life: number = 3000): void {
    this.show('info', summary, detail, life);
  }

  clear(): void {
    this.messageService.clear();
  }
}