# Brief de producción de libro

Duplica este archivo para cada libro y complétalo antes de generar ilustraciones. El estándar obligatorio está en docs/ESTANDAR-PRODUCCION-LIBROS.md.

## 1. Identificación

- Título:
- Slug: minúsculas-con-guiones
- Tema y subtemas:
- Idioma: español
- Edad objetivo:
- Objetivo del libro:
- Categoría del catálogo:
- Número de ilustraciones:

## 2. Especificación de impresión

- Tamaño: A4 (210 × 297 mm), salvo excepción aprobada
- Orientación: vertical
- Resolución raster mínima: 300 dpi
- Margen seguro: 10 mm como mínimo
- Formato final: PDF listo para imprimir
- Portada: a color / blanco y negro
- Bienvenida: sí / no
- Página blanca protectora después de cada dibujo: sí / no
- Contraportada: sí / no
- Total de páginas calculado:
- Excepciones al estándar y justificación:

Si se usa la secuencia predeterminada (portada + bienvenida + cada dibujo seguido de página blanca + contraportada), el total es 2 × número de ilustraciones + 3.

## 3. Mapa de páginas completo

Registra todas las páginas del PDF en el orden exacto. Cada página necesita su propia fila. No uses rangos ambiguos.

| Página | Tipo | Escena / contenido | Texto | ¿Debe quedar en blanco? |
|---:|---|---|---|---|
| 1 | Portada | | | No |
| 2 | Bienvenida | | | No |
| 3 | Ilustración 01 | | | No |
| 4 | Reverso protector 01 | | | Sí |
| 5 | Ilustración 02 | | | No |
| 6 | Reverso protector 02 | | | Sí |
| … | Añadir una fila por cada página | | | |

Total de filas del mapa: debe coincidir con el total de páginas del PDF y el campo pages.

## 4. Dirección visual

- Estilo de portada:
- Paleta de portada:
- Estilo interior: contorno negro limpio sobre fondo blanco
- Grosor de línea: objetivo 2–3 pt en tamaño final
- Nivel de detalle según edad:
- Composición: centrada, dentro de márgenes seguros
- Elementos prohibidos: grises, sombras, degradados, texturas, marcas de agua, logotipos y texto dentro de dibujos

## 5. Archivos y metadatos

- Portada: public/images/covers/<slug>.<ext>
- PDF: public/books/<slug>.pdf
- Ficha: src/content/books/<slug>.md
- Fuente editable / URL de Canva:
- Derechos y licencias de recursos:

Metadatos admitidos por src/content.config.ts:

~~~yaml
title: "Título del libro"
slug: "titulo-del-libro"
description: "Descripción específica de 20 a 220 caracteres."
age: "4-8"
pages: 53
category: "Fantasía"
characters: []
cover: "/images/covers/titulo-del-libro.svg"
pdf: "/books/titulo-del-libro.pdf"
featured: false
draft: true
publishedAt: "2026-11-24"
~~~

No agregar propiedades no admitidas por el schema. pages es el número real de páginas de todo el PDF, incluidas portada, bienvenida, páginas blancas y contraportada.

## 6. Control de calidad y aprobación

- [ ] Brief y mapa de páginas aprobados antes de diseñar.
- [ ] Todas las ilustraciones revisadas individualmente.
- [ ] Dificultad apropiada para la edad.
- [ ] Textos revisados en el idioma definido.
- [ ] Derechos de uso y distribución comprobados.
- [ ] PDF final abierto fuera de la herramienta de diseño.
- [ ] Total de páginas igual al mapa y al campo pages.
- [ ] Tamaño y orientación comprobados en todas las páginas.
- [ ] Cada página revisada visualmente.
- [ ] Páginas protectoras completamente vacías.
- [ ] Sin páginas accidentales, duplicadas ni omitidas.
- [ ] Portada y contraportada revisadas.
- [ ] Portada y PDF guardados en las rutas previstas.
- [ ] npm test, npm run validate, npm run check y npm run build correctos.
- [ ] Ficha y descarga pública verificadas después del despliegue.

## 7. Registro

- Fecha de inicio:
- Fecha de exportación:
- Revisor/a:
- Incidencias y resolución:
- Commit de publicación:
- URL de la ficha:
- URL del PDF:
