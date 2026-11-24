# Plan editorial: Frutas Divertidas y Felices

**Estado:** PDF, portada SVG y ficha Astro integrados en `main`; ficha publicada (`draft: false`). Pendiente comprobar el despliegue público final.  
**Slug:** `frutas-divertidas-y-felices`  
**Idioma:** español  
**Edad objetivo:** 3-6 años  
**Formato:** A4 vertical  
**Diseño Canva:** https://www.canva.com/d/wHkroUzXgGc6CTJ

## 1. Objetivo

Crear un libro infantil para colorear con frutas simpáticas y escenas sencillas. El interior debe ser fácil de imprimir y adecuado para preescolar: líneas negras claras y gruesas, formas grandes, fondo blanco y sin sombreado complejo.

## 2. Especificación aprobada

- Portada frontal a color, estilo pastel.
- Una página de bienvenida en español.
- 25 páginas de ilustraciones en blanco y negro.
- Después de cada ilustración, una página completamente blanca para proteger el reverso de la hoja.
- Contraportada.
- Total: **53 páginas A4 verticales**.

### Secuencia y numeración

| Páginas PDF | Contenido |
|---|---|
| 1 | Portada frontal |
| 2 | Bienvenida en español |
| 3 | Manzana sonriente |
| 4 | Página blanca |
| 5 | Racimo de plátanos |
| 6 | Página blanca |
| 7 | Fresa |
| 8 | Página blanca |
| 9 | Naranja |
| 10 | Página blanca |
| 11 | Pera |
| 12 | Página blanca |
| 13 | Sandía |
| 14 | Página blanca |
| 15 | Piña |
| 16 | Página blanca |
| 17 | Uvas |
| 18 | Página blanca |
| 19 | Limón |
| 20 | Página blanca |
| 21 | Melocotón |
| 22 | Página blanca |
| 23 | Cerezas |
| 24 | Página blanca |
| 25 | Aguacate |
| 26 | Página blanca |
| 27 | Coco |
| 28 | Página blanca |
| 29 | Kiwi |
| 30 | Página blanca |
| 31 | Mango |
| 32 | Página blanca |
| 33 | Cuenco de frutas |
| 34 | Página blanca |
| 35 | Cesta de picnic |
| 36 | Página blanca |
| 37 | Amigos frutales |
| 38 | Página blanca |
| 39 | Planta de fresas |
| 40 | Página blanca |
| 41 | Árbol de manzanas |
| 42 | Página blanca |
| 43 | Plátano con mariposas |
| 44 | Página blanca |
| 45 | Zumo de naranja |
| 46 | Página blanca |
| 47 | Polo de frutas |
| 48 | Página blanca |
| 49 | Puesto de frutas |
| 50 | Página blanca |
| 51 | Jardín frutal |
| 52 | Página blanca |
| 53 | Contraportada |

Las páginas blancas protectoras son exactamente las páginas pares de la 4 a la 52. No deben llevar texto, número, marca, fondo decorativo ni objetos.

## 3. Estado de los entregables

| Entregable | Estado |
|---|---|
| PDF maestro de 53 páginas | Generado y verificado |
| Tamaño A4 vertical en las 53 páginas | Verificado |
| 25 páginas blancas protectoras | Verificadas |
| Ilustraciones interiores en blanco y negro | Verificadas |
| Diseño importado en Canva | Disponible en el enlace superior |
| PDF dentro de `public/books/` | Integrado: `frutas_divertidas_y_felices_53_paginas_final.pdf` |
| Portada independiente en `public/images/covers/` | Integrada: `frutas-divertidas-y-felices.svg` |
| Ficha Markdown en `src/content/books/` | Publicada: `draft: false`, `featured: true` |
| Validador de número real de páginas PDF | Implementado con `pdf-lib`; prueba de unidad añadida |
| Validación, build y publicación del libro | Workflow de GitHub Actions iniciado tras la publicación de la ficha |

El PDF maestro está en `public/books/frutas_divertidas_y_felices_53_paginas_final.pdf`. La validación automatizada abre el PDF con `pdf-lib`, compara el recuento real con `pages` y comprueba que cada página sea A4 vertical (595.2756 × 841.8898 puntos, con tolerancia de 1 punto). La ficha tiene `pdf` configurado, `draft: false` y `featured: true`.

## 4. Integración en el sitio

Nombres de archivo recomendados:

- `public/books/frutas_divertidas_y_felices_53_paginas_final.pdf`
- `public/images/covers/frutas-divertidas-y-felices.svg` (portada provisional integrada; se puede sustituir por una exportación raster del diseño final)
- `src/content/books/frutas-divertidas-y-felices.md`

Usa el schema real de `src/content.config.ts`. El frontmatter compatible con el esquema actual es:

```yaml
---
title: "Frutas Divertidas y Felices"
slug: "frutas-divertidas-y-felices"
description: "Libro infantil para colorear con 25 dibujos sencillos de frutas y páginas blancas de protección para imprimir."
age: "3-6"
pages: 53
category: "Frutas"
cover: "/images/covers/frutas-divertidas-y-felices.svg"
pdf: "/books/frutas_divertidas_y_felices_53_paginas_final.pdf"
featured: true
draft: false
publishedAt: "2026-11-24"
---
```

El libro ya está publicado en la colección (`draft: false`) porque los archivos requeridos están integrados y la validación de contenido y las pruebas unitarias pasaron. Si se sustituye el PDF o la portada, vuelve a marcarlo como borrador hasta repetir las comprobaciones. El schema actual no declara `tags` ni `ageRange`; no agregues esos campos sin modificar también `src/content.config.ts` y sus validaciones.

## 5. Próximos pasos

1. Abrir el diseño Canva y, si se desea reemplazar la portada SVG provisional, exportar la portada frontal como imagen independiente.
2. El PDF maestro ya está integrado en `public/books/frutas_divertidas_y_felices_53_paginas_final.pdf`; no hace falta volver a subirlo.
3. La portada SVG está integrada en `public/images/covers/`.
4. La ficha publicada está en `src/content/books/frutas-divertidas-y-felices.md`.
5. Ejecutar las comprobaciones después de cualquier cambio:
   ```bash
   npm test
   npm run validate
   npm run check
   npm run build
   ```
6. Revisar localmente la ficha, la portada y la descarga del PDF.
7. Si todos los controles pasan, mantener `draft: false`.
8. Hacer commit y push a `main`; revisar el workflow de GitHub Actions.
9. Después del despliegue, abrir la URL pública y descargar el PDF para confirmar que funciona.

## 6. Criterios de aceptación

- [x] PDF con 53 páginas exactas.
- [x] Todas las páginas A4 verticales.
- [ ] Página 1 portada, página 2 bienvenida y página 53 contraportada.
- [ ] 25 ilustraciones distintas en páginas 3, 5, 7, ..., 51.
- [ ] 25 páginas completamente blancas en páginas 4, 6, 8, ..., 52.
- [ ] Sin páginas duplicadas, accidentales o fuera de orden.
- [x] Portada SVG independiente integrada; sustituirla si se decide usar la exportación final de Canva.
- [x] PDF dentro de `public/` y portada SVG integrada.
- [x] Frontmatter compatible con Astro Content Collections.
- [ ] Pruebas, validación, TypeScript/Astro y build correctos.
- [ ] Descarga pública probada después del despliegue.
