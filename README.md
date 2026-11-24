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
- npm 10 o superior (incluido con Node.js).
- Git para clonar y publicar cambios.

## Instalación y ejecución local

```bash
git clone https://github.com/gpldroid/kidsbooks.git
cd kidsbooks
npm install
npm run dev
```

Abre la URL local que muestra Astro, normalmente `http://localhost:4321/kidsbooks/`.

## Diseño y personalización

La identidad visual está centralizada en `src/styles/global.css`: modifica allí los colores, tipografía, sombras, radios, navegación, tarjetas y puntos de ruptura. Los componentes reutilizables están en `src/components/`:

- `SiteHeader.astro`: marca, navegación de escritorio y barra inferior móvil.
- `SiteFooter.astro`: pie de página y enlaces para compartir.
- `BookCard.astro`: tarjeta reutilizable de cada libro.
- `ScrollControls.astro`: botones accesibles para ir al inicio y al final.
- `BaseLayout.astro`: metadatos, estilos globales y estructura común.

Los efectos de profundidad usan CSS `perspective`, `transform`, gradientes y sombras; no requieren JavaScript ni librerías de animación. Se respeta `prefers-reduced-motion` para usuarios que reducen movimiento. Los iconos son SVG inline para mantener la web ligera y evitar dependencias externas.

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

## Añadir un libro

1. Crea una portada y guárdala en `public/images/covers/`.
2. Guarda el PDF final en `public/books/`.
3. Copia `templates/book-template.md` a `src/content/books/mi-libro.md`.
4. Edita el frontmatter y usa un `slug` único, en minúsculas y con guiones.
5. Comprueba que las rutas `cover` y `pdf` comiencen por `/` y apunten a archivos reales dentro de `public/`.
6. Mantén `draft: true` mientras preparas el libro.
7. Cuando el PDF y la portada estén revisados, cambia a `draft: false`.

Ejemplo:

```yaml
---
title: "Animales del bosque"
slug: "animales-del-bosque"
description: "Descubre animales del bosque con dibujos sencillos para colorear."
age: "3-6"
pages: 20
category: "Animales"
cover: "/images/covers/animales-del-bosque.svg"
pdf: "/books/animales-del-bosque.pdf"
featured: true
draft: false
publishedAt: "2026-11-24"
---
```

Los borradores no aparecen en el sitio público. Un libro publicado debe tener PDF y portada existentes; `npm run validate` lo comprueba antes del build.

## Flujo ChatGPT + Canva

1. Define tema, edad y número de páginas usando `templates/book-production-brief.md`.
2. Genera ilustraciones originales con las instrucciones de `docs/PROMPTS-CHATGPT.md`.
3. Revisa cada ilustración: fondo blanco, contornos claros, sin grises, marcas de agua ni contenido deformado.
4. Maqueta portada e interiores en Canva siguiendo `docs/GUIA-CANVA.md`.
5. Exporta y revisa el PDF página por página.
6. Añade los archivos y la ficha Markdown al repositorio.
7. Ejecuta las comprobaciones y publica mediante GitHub Actions.

La generación de imágenes y el diseño en Canva son pasos manuales. El repositorio automatiza validación, pruebas, build y despliegue; no utiliza APIs de ChatGPT ni Canva.

## Publicación en GitHub Pages

El proyecto está configurado para este repositorio:

- `site: https://gpldroid.github.io`
- `base: /kidsbooks`

Para activar el despliegue:

1. En GitHub abre **Settings → Pages**.
2. En **Build and deployment**, selecciona **GitHub Actions** como Source.
3. Confirma que el workflow `.github/workflows/deploy.yml` está habilitado.
4. Haz push a la rama `main`.
5. Revisa **Actions** hasta que terminen los trabajos Build y Deploy.

Cada push a `main` ejecuta las comprobaciones y publica el resultado si todo pasa. También puedes iniciar el workflow manualmente desde Actions.

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
│   ├── PRODUCCION-DE-LIBROS.md
│   └── PROMPTS-CHATGPT.md
├── public/
│   ├── images/
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   ├── book-validation.mjs
│   ├── book-validation.test.mjs
│   └── validate-books.mjs
├── src/
│   ├── components/
│   ├── content/books/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── content.config.ts
├── templates/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Documentación

- [Producción de libros](docs/PRODUCCION-DE-LIBROS.md)
- [Prompts de ChatGPT](docs/PROMPTS-CHATGPT.md)
- [Guía de Canva](docs/GUIA-CANVA.md)
- [Publicación en GitHub Pages](docs/DEPLOY-GITHUB-PAGES.md)
- [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md)
- [Sistema de diseño e interfaz](docs/DISENO-Y-UI.md)
- [Contribuir al proyecto](CONTRIBUTING.md)

## Licencias y uso responsable

Publica únicamente contenido original o recursos para los que tengas derechos de distribución. Revisa las condiciones vigentes de las herramientas y recursos utilizados. Consulta [Licencias y derechos](docs/LICENCIAS-Y-DERECHOS.md).

## Coste y límites

Astro, Tailwind CSS y GitHub Actions no requieren suscripciones para este flujo. GitHub Pages puede alojar sitios estáticos en repositorios públicos con GitHub Free, sujeto a sus límites y condiciones. Esta web está pensada como biblioteca gratuita, no como tienda ni plataforma de transacciones comerciales.
