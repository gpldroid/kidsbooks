# Sistema de diseño

La interfaz comparte un sistema visual único, definido en `src/styles/global.css`.

## Tokens y tipografía

- Fuente: Nunito, con fallback del sistema.
- Colores: crema, tinta, lila, menta, cielo, melocotón y limón.
- Variables: `--page-width`, `--surface`, `--line`, `--muted`, `--accent`, `--shadow-soft`, `--shadow-card`.
- Contenedor: `.container-page`, con ancho máximo centralizado.

## Componentes

| Archivo | Responsabilidad |
| --- | --- |
| `SiteHeader.astro` | Marca, navegación desktop y tab bar móvil |
| `SiteFooter.astro` | Pie, redes para compartir y copyright |
| `BookCard.astro` | Tarjetas de libros con profundidad CSS |
| `ScrollControls.astro` | Desplazamiento suave al inicio y al final |
| `BaseLayout.astro` | Metadatos, estilos y estructura común |

## Reglas de interfaz

1. Usa las clases y variables existentes antes de introducir valores visuales nuevos.
2. Mantén una escala tipográfica clara: títulos compactos y pesados, cuerpo legible y metadatos discretos.
3. Las tarjetas usan perspectiva, sombras por capas y transiciones CSS; evita añadir librerías solo para microinteracciones.
4. Respeta `prefers-reduced-motion`.
5. Los controles interactivos deben tener nombres accesibles, foco visible y objetivos táctiles cómodos.
6. Mantén el tab bar móvil por encima del contenido y respeta las áreas seguras de iOS/Android.
7. Usa SVG inline para iconos pequeños y no introduzcas dependencias de iconos sin necesidad.

## Ajustar el estilo

Edita `src/styles/global.css` para cambiar colores, tipografía, sombras, radios, breakpoints y efectos. Modifica los componentes en `src/components/` para cambiar estructura y contenido. El catálogo y las páginas deben seguir consumiendo los mismos componentes compartidos.
