# Brief de producción de libro

Completa este documento antes de generar ilustraciones o diseñar páginas.

## Identificación

- **Título:**
- **Slug:** `minúsculas-con-guiones`
- **Tema principal:**
- **Idioma:**
- **Edad objetivo:**
- **Objetivo educativo o de entretenimiento:**
- **Categoría del catálogo:**

## Especificación física

- **Tamaño:** A4 / US Letter / otro
- **Orientación:** vertical / horizontal
- **Número de ilustraciones:**
- **¿Incluye portada?:** sí / no
- **¿Incluye bienvenida?:** sí / no
- **¿Incluye contraportada?:** sí / no
- **¿Incluye páginas blancas protectoras?:** sí / no
- **Número total de páginas previsto:**

## Mapa de páginas

| N.º | Tipo de página | Descripción / escena | Idioma / texto |
|---:|---|---|---|
| 1 | Portada | | |
| 2 | Bienvenida / interior | | |
| 3 | Ilustración | | |

Añade filas hasta describir todas las páginas. Si hay páginas blancas protectoras, registra cada posición explícitamente.

## Dirección visual

- **Estilo de portada:**
- **Paleta de portada:**
- **Grosor de línea interior:**
- **Nivel de detalle:**
- **Elementos prohibidos:**
- **Márgenes seguros:**

## Archivos previstos

- Portada: `public/images/covers/<slug>.<ext>`
- PDF: `public/books/<slug>.pdf`
- Ficha: `src/content/books/<slug>.md`
- Fuente editable / URL de Canva:

## Metadatos Astro

Completa usando exclusivamente las propiedades declaradas en `src/content.config.ts`:

```yaml
title: "Título del libro"
slug: "titulo-del-libro"
description: "Descripción de 20 a 220 caracteres."
age: "3-6"
pages: 20
category: "Categoría"
cover: "/images/covers/titulo-del-libro.webp"
pdf: "/books/titulo-del-libro.pdf"
featured: false
draft: true
publishedAt: "2026-11-24"
```

## Control de calidad

- [ ] Brief aprobado antes de generar.
- [ ] Ilustraciones revisadas individualmente.
- [ ] Textos revisados en el idioma definido.
- [ ] PDF exportado y abierto fuera de Canva.
- [ ] Número y secuencia de páginas verificados.
- [ ] Tamaño y orientación comprobados en todas las páginas.
- [ ] Páginas blancas verificadas cuando corresponda.
- [ ] Derechos de uso y distribución comprobados.
- [ ] Portada y PDF guardados en `public/`.
- [ ] `npm test`, `npm run validate`, `npm run check` y `npm run build` correctos.
- [ ] Descarga pública comprobada después del despliegue.

## Registro de producción

- **Fecha de inicio:**
- **Fecha de exportación:**
- **Fecha de revisión:**
- **Persona revisora:**
- **Resultado / incidencias:**
- **Commit de publicación:**
- **URL pública:**
