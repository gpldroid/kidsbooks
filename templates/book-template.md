---
title: "Título del libro"
slug: "titulo-del-libro"
description: "Descripción clara y específica del tema y contenido del libro, entre 20 y 220 caracteres."
age: "4-8"
pages: 53
category: "Fantasía"
characters: []
cover: "/images/covers/titulo-del-libro.svg"
pdf: "/books/titulo-del-libro.pdf"
featured: false
draft: true
publishedAt: "2026-11-24"
---

Descripción editorial breve para la ficha del libro.

<!--
REGLAS:
- Duplica templates/book-production-brief.md y aprueba el mapa de páginas antes de producir.
- Este frontmatter debe coincidir con src/content.config.ts.
- Usa un único slug para el PDF, la portada y este archivo.
- pages representa todas las páginas del PDF, incluidas portada, bienvenida,
  páginas blancas protectoras y contraportada.
- Mantén draft: true hasta que ambos recursos existan, se inspeccionen y pasen
  npm test, npm run validate, npm run check y npm run build.
- No agregues campos sin actualizar primero el schema y sus pruebas.
- Consulta docs/ESTANDAR-PRODUCCION-LIBROS.md.
-->
