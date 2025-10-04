---
mode: agent
---
#title: Convert screenshot to Angular UI (standalone component)
#description: Genera un componente Angular standalone a partir de una captura de diseño.

Tarea: A partir de la imagen adjunta, genera un componente **standalone** de Angular 19 + PrimeNG que reproduzca la interfaz.

Requisitos:
- Usa componentes de **PrimeNG v19** con `@primeng/themes` (`p-button`, `p-card`, `p-table`, `p-dialog`, `p-dropdown`, `p-inputtext`, `p-checkbox`, `p-radiobutton`, `p-calendar`, `p-toolbar`, etc.) según convenga.
- **Tailwind CSS v4.1**: combinar clases utilitarias de Tailwind (`flex`, `p-4`, `gap-4`, `rounded-lg`, `bg-surface-0`, etc.) con componentes PrimeNG. **Extender, no reemplazar** estilos core de PrimeNG.
- **No cambies el nombre del componente**: usa exactamente el nombre que el desarrollador indique. Si el prompt no incluye nombre, usa el nombre de archivo que el usuario proporcione.
- Estructura de archivos: `component.ts`, `component.html`, `component.css`.
- Mantén el orden del código conforme a las instrucciones globales: `input()`, `output()`, `model()` → signals → `inject()` → `effect()` → lifecycle hooks → funciones.
- Si se requieren subcomponentes (por ejemplo, una card o una lista reutilizable), créalos como componentes separados y **reutiliza cualquier componente ya existente en el proyecto** cuando sea detectado.
- Usa **Signals** para estado y reactividad: `input()` para datos, `output()` para eventos, `signal()` para estado interno, `computed()` para valores derivados.
- Añade accesibilidad mínima: `aria-label` en botones no textuales, roles si aplica.
- Si hay formularios, usar `ReactiveFormsModule` con signals y mostrar validaciones usando `FormUtilsService` (ver `services-reference.prompt.md`).
- **Transloco para i18n**: usar claves de traducción de `public/assets/i18n/{es,en}.json`. En templates: `{{ 'KEY' | transloco }}`, en código: `transloco.translate('KEY')`.
- **Interoperabilidad RxJS ↔ Signals**: Observable → Signal con `toSignal()`, Signal → Observable con `toObservable()` (solo si API lo requiere). **Evitar** `subscribe()` directo.
- Inyección de dependencias: usar `inject()` en lugar del constructor.
- **NO crear archivos .md de documentación**. Explicaciones SOLO en el chat.
- Entrega: 1) Código de los archivos (.ts, .html, .css), 2) Notas de integración (imports, routes) SOLO en el chat, 3) Indicar qué componentes nuevos se crearon y si se reutilizaron existentes.
