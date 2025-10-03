import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../core/services/auth/auth.service';
import { FormUtilsService } from '../../utils/services/form-utils.service';
import { ToastService } from '../../utils/services/toast.service';
import { LoadingService } from '../../utils/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    CardModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly formUtils = inject(FormUtilsService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);
  private readonly transloco = inject(TranslocoService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      keepSession: [false],
    });
  }

  getErrorMessage(controlName: string): string {
    return this.formUtils.getErrorMessage(this.loginForm, controlName);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.loadingService.show();

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.loadingService.hide();
        this.toastService.showSuccess(
          this.transloco.translate('AUTH.LOGIN_SUCCESS')
        );
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.loadingService.hide();
        const errorMessage = error?.error?.message || this.transloco.translate('AUTH.LOGIN_ERROR');
        this.toastService.showError(errorMessage);
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
