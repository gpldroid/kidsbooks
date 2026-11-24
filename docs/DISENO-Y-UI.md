# Sistema de diseño e interfaz

La interfaz utiliza una identidad pastel compartida. Los tokens, estilos base, estados de interacción y breakpoints se centralizan en `src/styles/global.css`; los componentes conservan únicamente los estilos específicos de su estructura.

## Tokens y tipografía

- Fuente: Nunito con fallback del sistema.
- Paleta: crema, tinta, lila, menta, cielo, melocotón y limón.
- Variables principales: `--page-width`, `--surface`, `--line`, `--muted`, `--accent`, `--shadow-soft`, `--shadow-card`.
- Contenedor compartido: `.container-page`.

## Componentes activos

| Archivo | Responsabilidad |
|---|---|
| `Header.astro` | Única navegación compartida: menú desktop y tab bar móvil |
| `HeroSpotlight.astro` | Presentación principal del inicio |
| `CategoryGrid.astro` | Categorías, filtros por personaje/edad y resultados |
| `BookCard.astro` | Tarjeta reutilizable con portada y profundidad CSS |
| `SiteFooter.astro` | Pie de página y enlaces para compartir |
| `ScrollControls.astro` | Controles de desplazamiento |
| `BaseLayout.astro` | Metadatos, estilos globales y estructura HTML |

No se mantiene un segundo componente de encabezado. Todas las páginas deben importar `Header.astro` para que la navegación y la experiencia móvil sean consistentes.

## Reglas de interfaz

1. Reutiliza tokens y componentes antes de añadir estilos nuevos.
2. Mantén títulos claros, cuerpo legible y metadatos discretos.
3. Usa perspectiva y sombras CSS moderadas en las tarjetas; evita dependencias solo para microinteracciones.
4. Respeta `prefers-reduced-motion`.
5. Todos los controles interactivos necesitan etiqueta accesible, foco visible y objetivo táctil cómodo.
6. El tab bar móvil debe respetar `env(safe-area-inset-bottom)`.
7. Prefiere SVG inline para iconos pequeños y evita dependencias de iconos innecesarias.
8. Evita selectores globales que sobrescriban accidentalmente los estilos encapsulados de Astro.

## Modificar el diseño

- Edita `src/styles/global.css` para tokens, tipografía, estilos base, sombras y breakpoints.
- Edita el componente correspondiente para su estructura y estilos locales.
- Ejecuta `npm run check` y `npm run build` después de los cambios.