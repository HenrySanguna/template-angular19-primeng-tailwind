---
applyTo: '**'
---
# Instrucciones globales para Copilot (Angular 19 + PrimeNG + Tailwind)

## Contexto del proyecto
- Angular 19 standalone components
- Tailwind CSS **v4.1** + PrimeNG **v19.1** con `@primeng/themes`
- Transloco para i18n (español e inglés en `assets/i18n/`)
- **Signals** como patrón principal de reactividad
- Inyección con `inject()` en lugar de constructor
- CSS por componente, estilos globales en `src/styles.css`


## Estándares de código
- TypeScript estricto (strict mode)
- **Signals**: `signal()`, `computed()`, `effect()`, `input()`, `output()`, `model()`, `linkedSignal()`, `resource()`
- **RxJS** solo para: HTTP requests, eventos del router, streams complejos con operadores
- Interoperabilidad: `toSignal()` (Observable → Signal), `toObservable()` (Signal → Observable)
- Cleanup: con signals NO usar `destroy$` ni `takeUntil`, usar `effect()` cleanup o `onDestroy()`
- **Orden en componentes**:
  1. `input()` / `model()` / `output()`
  2. Signals públicos / variables privadas
  3. Inyección con `inject()`
  4. `effect()` / Lifecycle hooks
  5. Funciones públicas / privadas
- Nombres descriptivos, **NO agregar comentarios obvios o redundantes**
- Comentarios solo para lógica compleja que requiera explicación


## Patrones y librerías
- **PrimeNG**: `p-button`, `p-card`, `p-table`, `p-dialog`, `p-dropdown`, `p-inputtext`, `p-toast`, `p-confirmdialog`
- **Tailwind v4**: combinar utilidades (`flex`, `p-4`, `text-center`, `bg-primary`, `rounded-lg`) con clases PrimeNG
- **Transloco**: `{{ 'KEY' | transloco }}` en templates, `transloco.translate()` en código
- **Formularios**: usar signals con formularios reactivos


## Servicios del proyecto
- `ApiCallService`: llamadas HTTP (GET, POST, PUT, PATCH, DELETE)
- `AuthService`: autenticación (login, logout, register, refreshToken, checkTokenValidity, getUserData, recoverPassword, updatePassword, deleteAccount, isEmailTaken)
- `ToastService`: notificaciones con PrimeNG Toast (showSuccess, showError, showWarning, showInfo)
- `ModalService`: modales con PrimeNG Dialog (openModal, closeModal)
- `LoadingService`: indicadores de carga (show, hide, isLoading signal)
- `FormUtilsService`: validación de formularios (getFormControl, getFormError, getErrorMessage)

**Nota**: Todos exponen estado con signals


## Guards disponibles
- `authGuard`: verificar autenticación y token válido. Redirige a `/login` si falla
- `publicGuard`: permitir acceso solo si NO está autenticado. Redirige a `/home` si ya tiene sesión
- `roleGuard`: verificar roles de usuario. Muestra toast y navega hacia atrás si no tiene permisos (debe usarse siempre con authGuard)


## Tests
- NO generar tests unitarios por defecto
- NO agregar archivos `.spec.ts` salvo solicitud explícita


## Entregables cuando se solicita código
- Componente `.ts` standalone + template `.html` + estilos `.css` con Tailwind v4
- **Código limpio**: sin comentarios innecesarios, nombres auto-descriptivos
- **Explicaciones SOLO en chat** (NO crear `.md`, `README.md`, `USAGE.md`, `.example.ts`)
- Comentarios JSDoc solo para APIs públicas complejas
- Notas de integración (routes, providers) SOLO en chat


## Estructura de carpetas
```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # authGuard, publicGuard, roleGuard
│   │   ├── interfaces/      # Tipos compartidos (auth.ts, user.ts, api.ts)
│   │   ├── services/        # Servicios core (auth, api-call)
│   │   └── i18n/            # Configuración de Transloco
│   ├── pages/               # Páginas de la app
│   ├── shared/              # Componentes compartidos
│   └── utils/
│       └── services/        # Servicios utilitarios (toast, modal, loading, form-utils)
└── assets/
    └── i18n/                # Traducciones (es.json, en.json)
```
