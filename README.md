# KidsBooks

Biblioteca estática y gratuita de libros infantiles para colorear, descargar e imprimir en español. Construida con **Astro 5, TypeScript, Tailwind CSS 4 y Astro Content Collections**.

**Sitios publicados**
- GitHub Pages: https://gpldroid.github.io/kidsbooks/
- Vercel: https://kidsbooks-nativeapp.vercel.app/

## Estado de la publicación

El proyecto está configurado para publicar desde el mismo repositorio en GitHub Pages y Vercel, con rutas base independientes.

- **Vercel:** último deployment de producción verificado como `READY`; publica desde `/`.
- **GitHub Pages:** workflow de build y deploy verificado como `success`; publica bajo `/kidsbooks/`.
- **Validaciones del último workflow:** instalación, validación del contenido y PDF, pruebas, Astro/TypeScript, build, carga del artefacto y despliegue de Pages completados correctamente.

Consulta [el historial de GitHub Actions](https://github.com/gpldroid/kidsbooks/actions) y el [proyecto de Vercel](https://vercel.com/nativeapp/kidsbooks) para revisar ejecuciones posteriores.

## Funcionalidades

- Inicio con presentación de personajes, categorías y filtros por edad.
- Catálogo público, páginas estáticas de categorías y fichas individuales de cada libro publicado.
- Taxonomía centralizada, breadcrumbs y enlaces entre categorías, libros y títulos relacionados.
- Palabras clave y frases de búsqueda en metadatos, búsqueda del catálogo y datos estructurados.
- Contenido administrado mediante Markdown y validado con Zod.
- Portadas SVG y archivos PDF servidos desde `public/`.
- Navegación compartida: menú de escritorio y barra inferior móvil.
- Tarjetas de libros con efectos CSS 2D/3D, sombras y estados accesibles.
- Diseño responsive, iconos SVG, foco visible y soporte para `prefers-reduced-motion`.
- Enlaces para compartir y controles de desplazamiento.
- Sitemap XML y robots.txt.
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

En desarrollo local, Astro utiliza normalmente `http://localhost:4321/`. El prefijo `/kidsbooks/` se aplica únicamente al build de GitHub Pages.

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Astro en modo desarrollo |
| `npm run start` | Alias de npm run dev |
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
  components/
  content/books/
  layouts/
  pages/
  styles/
  content.config.ts
public/
  books/
  images/
  favicon.svg
  robots.txt
  .nojekyll
scripts/
  book-validation.mjs
  book-validation.test.mjs
  validate-books.mjs
docs/
templates/
```

Todas las páginas utilizan `Header.astro` y `SiteFooter.astro`. `BookCard.astro` se reutiliza en el inicio y el catálogo para evitar componentes duplicados.

## Añadir un libro

1. Duplica `templates/book-production-brief.md` y define tema, edad, dibujos y mapa de todas las páginas.
2. Sigue el [estándar editorial y técnico](docs/ESTANDAR-PRODUCCION-LIBROS.md) y el [flujo de producción](docs/PRODUCCION-DE-LIBROS.md).
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
| `category` | Texto, 2–40 caracteres; genera la ruta de categoría |
| `keywords` | Lista opcional de frases de búsqueda específicas, sin duplicados |
| `characters` | Lista opcional: fruits, animals, princesses, heroes, Naturaleza |
| `cover` | Ruta local que empieza por `/` |
| `pdf` | Ruta local opcional en borradores; obligatoria en libros publicados |
| `featured` | Booleano |
| `draft` | Booleano |
| `publishedAt` | Fecha |

No agregues campos al Markdown sin actualizar primero el esquema y el validador correspondiente.

## Libro publicado de referencia

**Frutas Divertidas y Felices** contiene 53 páginas A4 verticales. Su PDF y portada están integrados en `public/books/` y `public/images/covers/`. La ficha está en `src/content/books/frutas-divertidas-y-felices.md`. Consulta [docs/LIBRO-FRUTAS-DIVERTIDAS.md](docs/LIBRO-FRUTAS-DIVERTIDAS.md) para los detalles editoriales.

## Despliegue en varias plataformas

El mismo repositorio admite GitHub Pages y Vercel sin cambiar manualmente las rutas:

- **GitHub Pages:** el workflow configura `GITHUB_PAGES=true`, `ASTRO_SITE=https://gpldroid.github.io` y `ASTRO_BASE_PATH=/kidsbooks`.
- **Vercel:** usa la raíz del dominio (`/`) y detecta automáticamente `VERCEL_PROJECT_PRODUCTION_URL` o `VERCEL_URL`.
- **Netlify:** detecta la URL pública mediante `URL` y publica desde la raíz.
- **Cloudflare Pages / Render:** detecta las URL de plataforma disponibles y publica desde la raíz.

Variables opcionales para ajustes manuales:

| Variable | Uso |
|---|---|
| `ASTRO_SITE` | URL canónica absoluta del sitio |
| `ASTRO_BASE_PATH` | Prefijo de rutas, por ejemplo `/kidsbooks` o `/` |
| `GITHUB_PAGES=true` | Activa el prefijo de GitHub Pages cuando no se define `ASTRO_BASE_PATH` |

No configures `/kidsbooks` como base global en Vercel: allí el sitio se sirve desde الجذر.

### إعدادات Vercel

- Framework preset: Astro.
- Root directory: repository root.
- Build command: `npm run build`.
- Install command: `npm install --no-audit --no-fund`.
- Output directory: `dist`.
- Node.js: 22.x.
- Production URL: https://kidsbooks-nativeapp.vercel.app/

لا تضف `GITHUB_PAGES=true` إلى متغيرات Vercel؛ هذا المتغير مخصص لـ GitHub Pages فقط.

## GitHub Pages

La configuración del proyecto corresponde a:

- site: https://gpldroid.github.io
- base: `/kidsbooks`

En GitHub, configura **Settings → Pages → Build and deployment → GitHub Actions**. Cada push a `main` ejecuta `.github/workflows/deploy.yml`. Revisa Actions y confirma que Build y Deploy terminen correctamente.

Guía detallada: [docs/DEPLOY-GITHUB-PAGES.md](docs/DEPLOY-GITHUB-PAGES.md).

## Lista de comprobación antes de publicar

- [ ] El libro tiene portada y PDF finales.
- [ ] Los metadatos coinciden con el contenido real del PDF.
- [ ] `npm run validate`, `npm test`, `npm run check` y `npm run build` terminan correctamente.
- [ ] Se revisan la portada, la ficha, la categoría y la descarga PDF en GitHub Pages.
- [ ] Se revisan las mismas páginas y enlaces en Vercel.
- [ ] Se comprueban navegación móvil, enlaces internos y ausencia de errores 404.
- [ ] Se confirma que los dos despliegues terminaron correctamente en sus respectivos paneles.

## Documentación

- [Arquitectura SEO, taxonomía y enlazado interno](docs/ARQUITECTURA-SEO-Y-ENLAZADO-INTERNO.md)
- [Estándar editorial y técnico de libros](docs/ESTANDAR-PRODUCCION-LIBROS.md)
- [Flujo de producción de libros](docs/PRODUCCION-DE-LIBROS.md)
- [Brief de producción](templates/book-production-brief.md)
- [Plantilla de metadatos](templates/book-template.md)
- [Diseño e interfaz](docs/DISENO-Y-UI.md)
- [Libro Frutas Divertidas y Felices](docs/LIBRO-FRUTAS-DIVERTIDAS.md)
- [Prompts de ChatGPT](docs/PROMPTS-CHATGPT.md)
- [Guía de Canva](docs/GUIA-CANVA.md)
- [Publicación en GitHub Pages](docs/DEPLOY-GITHUB-PAGES.md)
- [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md)
- [Contribuir](CONTRIBUTING.md)

## Licencias y uso responsable

Publica únicamente ilustraciones originales o recursos cuyos derechos permitan su uso y distribución. Conserva el registro de licencias y revisa las condiciones de las herramientas utilizadas.
