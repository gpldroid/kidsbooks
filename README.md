# kids books

Biblioteca estática y gratuita de libros infantiles para colorear, descargar e imprimir en español. Construida con **Astro 5, TypeScript, Tailwind CSS 4 y Astro Content Collections** y publicada en GitHub Pages.

**Sitio:** https://gpldroid.github.io/kidsbooks/

## Funcionalidades

- Inicio con presentación de personajes, categorías y filtros por edad.
- Catálogo público y páginas estáticas individuales para cada libro publicado.
- Contenido administrado mediante Markdown y validado con Zod.
- Portadas SVG y archivos PDF servidos desde `public/`.
- Navegación compartida: menú de escritorio y barra inferior móvil.
- Tarjetas de libros con efectos CSS 2D/3D, sombras y estados accesibles.
- Diseño responsive, iconos SVG, foco visible y soporte para `prefers-reduced-motion`.
- Enlaces para compartir y controles de desplazamiento.
- Sitemap XML y `robots.txt`.
- Validación de metadatos, rutas seguras, existencia de recursos, número de páginas y dimensiones A4 de los PDF.
- Pruebas automatizadas con el test runner integrado de Node.js.
- GitHub Actions valida, comprueba, construye y despliega el sitio.

El proyecto no incluye backend, base de datos, autenticación, panel de administración, pagos ni analítica.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Git.

## Instalación local

```bash
git clone https://github.com/gpldroid/kidsbooks.git
cd kidsbooks
npm install
npm run dev
```

Abre la dirección local que muestra Astro (normalmente `http://localhost:4321/kidsbooks/`).

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Astro en modo desarrollo |
| `npm run start` | Alias de `npm run dev` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve localmente el último build |
| `npm run check` | Comprueba Astro y TypeScript |
| `npm run validate` | Valida metadatos, rutas, archivos y PDF |
| `npm test` | Ejecuta las pruebas automatizadas |

Antes de integrar cambios, ejecuta:

```bash
npm test
npm run validate
npm run check
npm run build
npm run preview
```

## Arquitectura

```text
src/
├── components/
│   ├── Header.astro          # Navegación desktop y mobile tab bar
│   ├── HeroSpotlight.astro   # Hero de la página de inicio
│   ├── CategoryGrid.astro    # Categorías, filtros y catálogo de inicio
│   ├── BookCard.astro        # Tarjeta reutilizable de libro
│   ├── SiteFooter.astro      # Pie y enlaces para compartir
│   └── ScrollControls.astro  # Controles de desplazamiento
├── content/
│   └── books/                # Un archivo Markdown por libro
├── layouts/
│   └── BaseLayout.astro      # HTML común, SEO y estilos globales
├── pages/
│   ├── index.astro           # Inicio
│   ├── 404.astro             # Página no encontrada
│   └── libros/
│       ├── index.astro       # Catálogo
│       └── [slug].astro      # Ficha estática de cada libro
├── styles/
│   └── global.css            # Tokens, estilos base y responsive
└── content.config.ts         # Esquema de Content Collections

public/
├── books/                    # PDF descargables
├── images/                   # Ilustraciones y portadas
├── favicon.svg
├── robots.txt
└── .nojekyll

scripts/
├── book-validation.mjs       # Lógica de validación reutilizable
├── book-validation.test.mjs  # Pruebas unitarias
└── validate-books.mjs        # Entrada CLI de validación

docs/                         # Guías editoriales, técnicas y de publicación
templates/                    # Plantillas para nuevos libros
P 01                          # Brief de referencia del proyecto (conservar)
```

### Componentes compartidos

Todas las páginas utilizan `Header.astro` y `SiteFooter.astro`. El antiguo encabezado duplicado se eliminó para mantener una sola fuente de navegación y evitar diferencias entre páginas. `BookCard.astro` se reutiliza en el inicio y el catálogo.

## Añadir un libro

1. Define tema, edad, objetivo y paginación en `templates/book-production-brief.md`.
2. Sigue el proceso de `docs/PRODUCCION-DE-LIBROS.md`.
3. Guarda la portada en `public/images/covers/`.
4. Guarda el PDF final en `public/books/`.
5. Crea `src/content/books/<slug>.md` usando `templates/book-template.md`.
6. Mantén `draft: true` hasta que portada y PDF estén listos y revisados.
7. Cambia a `draft: false` y ejecuta todas las comprobaciones.

El esquema de contenido está definido en `src/content.config.ts`:

| Campo | Regla |
|---|---|
| `title` | Texto, 3–90 caracteres |
| `slug` | Minúsculas, números y guiones |
| `description` | Texto, 20–220 caracteres |
| `age` | Rango en texto, por ejemplo `3-6` |
| `pages` | Entero positivo, máximo 200 |
| `category` | Texto, 2–40 caracteres |
| `characters` | Lista opcional: `fruits`, `animals`, `princesses`, `heroes` |
| `cover` | Ruta local que empieza por `/` |
| `pdf` | Ruta local opcional en borradores; obligatoria en libros publicados |
| `featured` | Booleano |
| `draft` | Booleano |
| `publishedAt` | Fecha |

No agregues campos al Markdown sin actualizar primero el esquema y el validador correspondiente.

## Libro publicado de referencia

**Frutas Divertidas y Felices** contiene 53 páginas A4 verticales. Su PDF y portada están integrados en `public/books/` y `public/images/covers/`. La ficha está en `src/content/books/frutas-divertidas-y-felices.md`. Consulta `docs/LIBRO-FRUTAS-DIVERTIDAS.md` para los detalles editoriales.

## GitHub Pages

La configuración del proyecto corresponde a:

- `site: https://gpldroid.github.io`
- `base: /kidsbooks`

En GitHub, configura **Settings → Pages → Build and deployment → GitHub Actions**. Cada push a `main` ejecuta el workflow de `.github/workflows/deploy.yml`. Revisa Actions y confirma que Build y Deploy terminen correctamente.

Guía detallada: [docs/DEPLOY-GITHUB-PAGES.md](docs/DEPLOY-GITHUB-PAGES.md).

## Documentación

- [Diseño e interfaz](docs/DISENO-Y-UI.md)
- [Producción de libros](docs/PRODUCCION-DE-LIBROS.md)
- [Libro Frutas Divertidas y Felices](docs/LIBRO-FRUTAS-DIVERTIDAS.md)
- [Prompts de ChatGPT](docs/PROMPTS-CHATGPT.md)
- [Guía de Canva](docs/GUIA-CANVA.md)
- [Publicación en GitHub Pages](docs/DEPLOY-GITHUB-PAGES.md)
- [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md)
- [Contribuir](CONTRIBUTING.md)

## Licencias y uso responsable

Publica únicamente ilustraciones originales o recursos cuyos derechos permitan su uso y distribución. Conserva el registro de licencias y revisa las condiciones de las herramientas utilizadas.