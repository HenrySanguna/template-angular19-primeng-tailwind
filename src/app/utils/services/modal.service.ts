import { inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

export interface ModalConfig {
  header?: string;
  width?: string;
  height?: string;
  contentStyle?: Record<string, string>;
  baseZIndex?: number;
  maximizable?: boolean;
  modal?: boolean;
  dismissableMask?: boolean;
  closeOnEscape?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialogService = inject(DialogService);
  private dialogRef: DynamicDialogRef | null = null;

  openModal<T = unknown>(
    component: Type<unknown>,
    config: ModalConfig = {},
    data: Record<string, unknown> = {}
  ): DynamicDialogRef {
    this.dialogRef = this.dialogService.open(component, {
      header: config.header || '',
      width: config.width || '50vw',
      height: config.height || 'auto',
      contentStyle: config.contentStyle || {},
      baseZIndex: config.baseZIndex || 10000,
      maximizable: config.maximizable || false,
      modal: config.modal !== undefined ? config.modal : true,
      dismissableMask: config.dismissableMask !== undefined ? config.dismissableMask : true,
      closeOnEscape: config.closeOnEscape !== undefined ? config.closeOnEscape : true,
      position: config.position || 'center',
      data
    });

    return this.dialogRef;
  }

  closeModal(result?: unknown): void {
    if (this.dialogRef) {
      this.dialogRef.close(result);
      this.dialogRef = null;
    }
  }

  destroy(): void {
    if (this.dialogRef) {
      this.dialogRef.destroy();
      this.dialogRef = null;
    }
  }
}
