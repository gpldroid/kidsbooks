# kids books

Biblioteca gratuita de libros infantiles para colorear, descargar e imprimir. Sitio estático en español, con diseño pastel, construido con **Astro + TypeScript + Tailwind CSS 4 + Content Collections** y publicado en **GitHub Pages**.

**Sitio:** https://gpldroid.github.io/kidsbooks/

## Características

- Biblioteca pública de libros infantiles gratuitos.
- Páginas de inicio, catálogo y ficha individual de cada libro.
- Gestión de libros mediante archivos Markdown y validación con Zod.
- Imágenes y PDF servidos desde `public/`.
- Diseño responsive con navegación inferior móvil, controles de desplazamiento, iconografía SVG accesible y paleta pastel.
- Sistema visual centralizado: tipografía Nunito, tokens CSS, tarjetas con profundidad 2D/3D y microinteracciones.
- Enlaces de compartir mediante WhatsApp, Facebook y Pinterest.
- Sitemap XML y robots.txt.
- Pruebas automatizadas con Node.js.
- GitHub Actions ejecuta validación, pruebas, comprobación TypeScript/Astro, build y despliegue.
- Sin panel de administración, backend, base de datos, autenticación ni pagos.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Git.

## Instalación y ejecución local

```bash
git clone https://github.com/gpldroid/kidsbooks.git
cd kidsbooks
npm install
npm run dev
```

Abre la URL local que muestra Astro, normalmente `http://localhost:4321/kidsbooks/`.

## Comandos disponibles

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Generar sitio estático en `dist/` |
| `npm run preview` | Previsualizar el build |
| `npm run check` | Revisar Astro y TypeScript |
| `npm run validate` | Validar metadatos y archivos de libros |
| `npm test` | Ejecutar pruebas automatizadas |

Antes de publicar, ejecuta:

```bash
npm test
npm run validate
npm run check
npm run build
```

## Diseño y personalización

La identidad visual está centralizada en `src/styles/global.css`. Los componentes reutilizables están en `src/components/`:

- `SiteHeader.astro`: marca y navegación.
- `SiteFooter.astro`: pie de página y enlaces para compartir.
- `BookCard.astro`: tarjeta de cada libro.
- `ScrollControls.astro`: controles accesibles de desplazamiento.
- `BaseLayout.astro`: metadatos, estilos y estructura común.

## Añadir un libro

1. Define el tema, edad, objetivo y paginación con `templates/book-production-brief.md`.
2. Sigue el flujo editorial de [Producción de libros](docs/PRODUCCION-DE-LIBROS.md).
3. Genera y revisa las ilustraciones con [Prompts de ChatGPT](docs/PROMPTS-CHATGPT.md).
4. Maqueta y exporta siguiendo la [Guía de Canva](docs/GUIA-CANVA.md).
5. Guarda la portada en `public/images/covers/` y el PDF final en `public/books/`.
6. Copia `templates/book-template.md` a `src/content/books/<slug>.md` y completa el frontmatter.
7. Mantén `draft: true` mientras falte cualquier archivo o revisión. Cambia a `draft: false` solo cuando PDF y portada estén dentro de `public/` y la validación pase.
8. Ejecuta las comprobaciones y revisa el resultado local antes de publicar.

La colección actual usa este esquema en `src/content.config.ts`:

| Campo | Tipo / regla |
|---|---|
| `title` | Texto, 3-90 caracteres |
| `slug` | Minúsculas, números y guiones |
| `description` | Texto, 20-220 caracteres |
| `age` | Texto, por ejemplo `3-6` |
| `pages` | Entero positivo, máximo 200 |
| `category` | Texto |
| `cover` | Ruta local que empieza por `/` |
| `pdf` | Ruta local opcional para borradores; obligatoria al publicar |
| `featured` | Booleano |
| `draft` | Booleano |
| `publishedAt` | Fecha |

Ejemplo de frontmatter:

```yaml
---
title: "Frutas Divertidas y Felices"
slug: "frutas-divertidas-y-felices"
description: "Libro infantil para colorear con 25 dibujos sencillos de frutas y páginas blancas de protección para imprimir."
age: "3-6"
pages: 53
category: "Frutas"
cover: "/images/covers/frutas-divertidas-y-felices.svg"
pdf: "/books/frutas-divertidas-y-felices.pdf"
featured: false
draft: true
publishedAt: "2026-11-24"
---
```

No añadas campos como `tags` o `ageRange` al frontmatter hasta ampliar también el schema de `src/content.config.ts`. El ejemplo anterior es compatible con el esquema actual; cambia a `draft: false` únicamente cuando los dos archivos existan y estén revisados.

## Libro de referencia: Frutas Divertidas y Felices

Se ha producido una primera edición de **53 páginas A4 verticales**:

- Portada a color, página de bienvenida en español, 25 ilustraciones de frutas en blanco y negro, 25 páginas completamente blancas alternadas después de cada ilustración y contraportada.
- PDF exportado y revisado: 53 páginas; las páginas 4, 6, 8, ..., 52 son páginas blancas; todas las páginas tienen proporción A4 vertical.
- Diseño importado en Canva: [Abrir Frutas Divertidas y Felices](https://www.canva.com/d/wHkroUzXgGc6CTJ).
- La ficha Markdown y una portada SVG ya están integradas en Content Collections y `public/images/covers/`, pero el libro permanece en `draft: true`. El PDF maestro verificado (53 páginas) aún se conserva fuera del repositorio y no está en `public/books/`; por eso el título no aparece en el catálogo ni se ofrece una descarga falsa. El validador ahora compara la cantidad de páginas declarada con la cantidad real del PDF usando `pdf-lib`. Sigue `docs/LIBRO-FRUTAS-DIVERTIDAS.md` para completar la publicación cuando el PDF se incorpore al repositorio.

## Publicación en GitHub Pages

El proyecto está configurado para este repositorio:

- `site: https://gpldroid.github.io`
- `base: /kidsbooks`

1. En GitHub abre **Settings → Pages**.
2. En **Build and deployment**, selecciona **GitHub Actions**.
3. Confirma que `.github/workflows/deploy.yml` está habilitado.
4. Haz push a `main`.
5. Revisa **Actions** hasta que terminen Build y Deploy.

Cada push a `main` ejecuta validación, pruebas, comprobación, build y despliegue.

## Estructura del proyecto

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/deploy.yml
│   └── pull_request_template.md
├── docs/
│   ├── DEPLOY-GITHUB-PAGES.md
│   ├── GUIA-CANVA.md
│   ├── LICENCIAS-Y-DERECHOS.md
│   ├── LIBRO-FRUTAS-DIVERTIDAS.md
│   ├── PRODUCCION-DE-LIBROS.md
│   └── PROMPTS-CHATGPT.md
├── public/
│   ├── images/
│   ├── books/
│   └── robots.txt
├── scripts/
├── src/
│   ├── components/
│   ├── content/books/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── content.config.ts
├── templates/
│   ├── book-production-brief.md
│   └── book-template.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Documentación

- [Plan específico del libro de frutas](docs/LIBRO-FRUTAS-DIVERTIDAS.md)
- [Producción de libros](docs/PRODUCCION-DE-LIBROS.md)
- [Prompts de ChatGPT](docs/PROMPTS-CHATGPT.md)
- [Guía de Canva](docs/GUIA-CANVA.md)
- [Publicación en GitHub Pages](docs/DEPLOY-GITHUB-PAGES.md)
- [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md)
- [Sistema de diseño e interfaz](docs/DISENO-Y-UI.md)
- [Contribuir al proyecto](CONTRIBUTING.md)

## Licencias y uso responsable

Publica únicamente contenido original o recursos para los que tengas derechos de distribución. Revisa las condiciones vigentes de las herramientas y recursos utilizados. Consulta [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md).
