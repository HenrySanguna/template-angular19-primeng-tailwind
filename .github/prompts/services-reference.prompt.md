---
applyTo: '**/*.service.ts'
---
# Referencia de servicios del proyecto

> **Nota**: Este archivo solo se carga cuando trabajas con servicios. No necesitas memorizarlo.

## AuthService (core/services/auth/)
**Estado**:
- `isAuthenticated` signal
- `currentUser` signal
- `isLoading` signal

**Métodos**:
- `login(credentials: LoginRequest): Observable<LoginResponse>`
- `logout(): void`
- `register(data: RegisterRequest): Observable<RegisterResponse>`
- `refreshToken(): Observable<RefreshTokenResponse>`
- `checkTokenValidity(): boolean`
- `getUserData(): Observable<User>`
- `recoverPassword(email: string): Observable<void>`
- `updatePassword(data: UpdatePasswordRequest): Observable<void>`
- `deleteAccount(): Observable<void>`
- `isEmailTaken(email: string): Observable<boolean>`


## ApiCallService (core/services/)
**Métodos genéricos HTTP**:
- `get<T>(endpoint: string, options?): Observable<T>`
- `post<T>(endpoint: string, body: any, options?): Observable<T>`
- `put<T>(endpoint: string, body: any, options?): Observable<T>`
- `patch<T>(endpoint: string, body: any, options?): Observable<T>`
- `delete<T>(endpoint: string, options?): Observable<T>`

**Configuración**: maneja automáticamente headers, tokens y errores


## ToastService (utils/services/)
**Estado**:
- `messages` signal (array de mensajes)

**Métodos**:
- `showSuccess(message: string, title?: string): void`
- `showError(message: string, title?: string): void`
- `showWarning(message: string, title?: string): void`
- `showInfo(message: string, title?: string): void`
- `clear(): void`

**Uso**: Requiere `<p-toast />` en template root


## ModalService (utils/services/)
**Estado**:
- `isVisible` signal
- `currentComponent` signal

**Métodos**:
- `openModal(component: Type<any>, data?: any): void`
- `closeModal(): void`
- `getModalData(): any`

**Uso**: Requiere `<p-dialog />` en template root


## LoadingService (utils/services/)
**Estado**:
- `isLoading` signal (boolean)
- `message` signal (string opcional)

**Métodos**:
- `show(message?: string): void`
- `hide(): void`

**Uso**: Requiere `<p-blockUI />` o similar en template root


## FormUtilsService (utils/services/)
**Métodos para validación de formularios**:
- `getFormControl(form: FormGroup, controlName: string): FormControl`
- `getFormError(form: FormGroup, controlName: string): string | null`
- `getErrorMessage(control: AbstractControl, fieldName: string): string`
- `markAllAsTouched(form: FormGroup): void`
- `resetForm(form: FormGroup): void`

**Uso**: Para trabajar con formularios reactivos y mostrar errores de validación
