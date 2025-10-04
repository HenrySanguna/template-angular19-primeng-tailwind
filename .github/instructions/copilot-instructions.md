---
applyTo: '**'
---
# Instrucciones globales para Copilot (Angular 19 + PrimeNG + Tailwind)

## Contexto del proyecto
- Angular 19 standalone components
- Tailwind CSS **v4.1** + PrimeNG **v19.1** con `@primeng/themes`
- Transloco para i18n (español e inglés)
- **Signals** como patrón principal de reactividad
- Inyección con `inject()` en lugar de constructor


## Estándares de código
- TypeScript estricto (strict mode)
- **Signals primero**: `signal()`, `computed()`, `effect()`, `input()`, `output()`, `model()`, `linkedSignal()`, `resource()`
- **RxJS**: solo para HTTP, router events o streams complejos que requieran operadores
- **Interoperabilidad Signals ↔ RxJS**:
  - Observable → Signal: usar `toSignal()` (preferido)
  - Signal → Observable: usar `toObservable()` (solo si API lo requiere)
  - **Evitar** `subscribe()` directo; preferir signals para estado reactivo
- **Cleanup**: con signals NO usar `destroy$` ni `takeUntil`, usar `effect()` cleanup o `onDestroy()`
- **Orden en componentes**:
  1. `input()` / `model()` / `output()`
  2. Signals públicos / variables privadas
  3. Inyección con `inject()`
  4. `effect()` / Lifecycle hooks
  5. Funciones públicas / privadas
- Nombres descriptivos, **NO agregar comentarios obvios o redundantes**
- Comentarios solo para lógica compleja que requiera explicación


## Patrones y librerías

### PrimeNG
- Usar componentes oficiales de PrimeNG v19 con `@primeng/themes`
- Componentes comunes: `p-button`, `p-card`, `p-table`, `p-dialog`, `p-dropdown`, `p-inputtext`, `p-toast`, `p-confirmdialog`
- Consultar documentación oficial para componentes específicos

### Tailwind + PrimeNG
- **Extender, no reemplazar**: usar clases utilitarias de Tailwind (`flex`, `p-4`, `gap-4`, `rounded-lg`) sin sobreescribir estilos core de PrimeNG
- Combinar ambos: `<p-button class="w-full" />` es válido
- No intentar recrear componentes PrimeNG con solo Tailwind

### Transloco (i18n)
- **Templates**: `{{ 'auth.login.title' | transloco }}`
- **Código**: `transloco.translate('auth.login.title')`
- **Nuevas claves**: usar formato `kebab-case` en inglés (`auth.login.submit-button`)
- **NO hardcodear texto**: siempre usar claves de traducción
- Traducciones en `public/assets/i18n/{es,en}.json`

### Formularios
- Usar signals con formularios reactivos
- Para validación, usar `FormUtilsService` (ver `services-reference.prompt.md`)


## Servicios del proyecto
Servicios disponibles: `AuthService`, `ApiCallService`, `ToastService`, `ModalService`, `LoadingService`, `FormUtilsService`

**Características comunes**:
- Todos exponen estado con signals
- Para métodos detallados, consultar `services-reference.prompt.md`


## Guards disponibles
- `authGuard`: verificar autenticación y token válido. Redirige a `/login` si falla
- `publicGuard`: permitir acceso solo si NO está autenticado. Redirige a `/home` si ya tiene sesión
- `roleGuard`: verificar roles de usuario. Muestra toast y navega hacia atrás si no tiene permisos (debe usarse siempre con `authGuard`)


## Ubicación de nuevos archivos
- **Componentes compartidos** → `src/app/shared/components/`
- **Páginas** → `src/app/pages/{feature}/`
- **Servicios utilitarios** → `src/app/utils/services/`
- **Servicios core** → `src/app/core/services/`
- **Interfaces compartidas** → `src/app/core/interfaces/`
- **Guards** → `src/app/core/guards/`


## Tests
- NO generar tests unitarios por defecto
- NO agregar archivos `.spec.ts` salvo solicitud explícita


## Entregables cuando se solicita código
- Componente `.ts` standalone + template `.html` + estilos `.css` con Tailwind v4
- **Código limpio**: sin comentarios innecesarios, nombres auto-descriptivos
- **Explicaciones SOLO en chat** (NO crear `.md`, `README.md`, `USAGE.md`, `.example.ts`)
- Comentarios JSDoc solo para APIs públicas complejas
- Notas de integración (routes, providers) SOLO en chat
