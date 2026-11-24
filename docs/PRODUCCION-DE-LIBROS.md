# Flujo estándar de producción de libros

Este documento define el proceso repetible para crear nuevos libros infantiles para colorear y publicarlos en la biblioteca. La especificación particular de cada libro debe guardarse en `templates/book-production-brief.md` y los criterios de ilustración/exportación se aplican antes de integrar cualquier libro en Astro.

## 1. Definir el producto

Antes de generar imágenes, registrar:

- Título y slug único.
- Tema y subtemas.
- Edad objetivo y nivel de dificultad.
- Idioma de portada, bienvenida y metadatos.
- Tamaño de página y orientación.
- Número de ilustraciones y páginas auxiliares.
- Orden exacto de las páginas.
- Requisitos de impresión, derechos y formato de entrega.

No empezar la maquetación hasta que la secuencia de páginas esté definida.

## 2. Crear las ilustraciones

Usa `docs/PROMPTS-CHATGPT.md`. Genera una ilustración por página, no una lámina con varias páginas. Mantén consistencia de estilo, grosor de línea y complejidad. Revisa cada imagen antes de incorporarla.

Criterios mínimos para páginas de colorear:

- Fondo blanco puro y líneas negras nítidas.
- Formas cerradas, grandes y fáciles de colorear.
- Sin grises, sombras, degradados, texturas ni tramados.
- Sin texto, números, marcas de agua ni logotipos dentro de las ilustraciones.
- Composición centrada, sin partes importantes cortadas.
- Adecuación a la edad y contenido original.

## 3. Diseñar portada y páginas editoriales

La portada debe ser a color y coherente con la identidad pastel de la biblioteca. Añade página de bienvenida cuando el brief lo requiera. La bienvenida, títulos y textos editoriales deben estar en el idioma elegido y revisarse ortográfica y tipográficamente.

## 4. Maquetar y exportar

Sigue `docs/GUIA-CANVA.md`. Mantén el mismo tamaño y orientación en todas las páginas. Define una secuencia de páginas antes de diseñar; no añadas páginas de relleno sin registrarlas en el brief.

Exporta como PDF para impresión cuando esté disponible. Conserva el archivo fuente editable de Canva y una copia local del PDF final.

## 5. Control de calidad obligatorio

No marques un libro como terminado hasta verificar todos los puntos:

1. El PDF abre sin errores y no está protegido por contraseña.
2. El número de páginas coincide exactamente con el brief.
3. La secuencia, el orden y la orientación de todas las páginas son correctos.
4. El tamaño de página es el esperado (A4 vertical, salvo que el brief indique otra cosa).
5. Cada ilustración es legible, original, completa y apta para impresión.
6. Las páginas en blanco previstas están realmente vacías: sin texto, numeración, marcas, ilustraciones ni elementos ocultos visibles.
7. No existen páginas vacías accidentales ni duplicados.
8. Portada, bienvenida y contraportada no tienen errores.
9. Se revisa el PDF exportado, no solo el lienzo de Canva.
10. Se registra el resultado de la revisión en el brief o en el documento específico del libro.

Para libros con páginas blancas protectoras, verifica el patrón de páginas exacto. No basta con comprobar visualmente algunas páginas: comprueba el número total y cada página prevista.

## 6. Integrar el libro en Astro

Los archivos se organizan así:

- Portada: `public/images/covers/<slug>.<ext>`
- PDF: `public/books/<slug>.pdf`
- Metadatos: `src/content/books/<slug>.md`

Copia `templates/book-template.md`. El frontmatter debe respetar `src/content.config.ts`; no inventes propiedades que el schema no acepte. Las rutas de `cover` y `pdf` son rutas locales desde la raíz pública y deben comenzar por `/`.

Mantén `draft: true` hasta que PDF y portada estén guardados en `public/` y las comprobaciones pasen. Los borradores no se muestran en el catálogo público. No uses `draft: false` con enlaces externos o archivos que todavía no estén en el repositorio.

## 7. Validar y publicar

Desde la raíz del proyecto:

```bash
npm install
npm test
npm run validate
npm run check
npm run build
npm run preview
```

Revisa la ficha y descarga el PDF desde la previsualización. Después crea un commit y push a `main`. GitHub Actions repite validación, pruebas, comprobación y build antes de desplegar GitHub Pages.

Tras el despliegue, abre la URL pública, comprueba la ficha y descarga el PDF publicado. La publicación no se considera verificada hasta que la descarga pública funcione.

## 8. Archivo y mantenimiento

Conserva:

- Brief aprobado.
- PDF final exportado.
- Fuente editable de Canva y su URL.
- Portada exportada por separado.
- Registro de control de calidad.
- Registro de derechos/licencias de recursos externos.

No sobrescribas un PDF publicado sin conservar una copia de la versión anterior. Para actualizar un libro, revisa también sus metadatos, portada, número de páginas y enlaces.
