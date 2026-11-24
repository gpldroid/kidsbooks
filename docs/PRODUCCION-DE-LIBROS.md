# Flujo de producción de libros

## 1. Planificar
Define tema, edad, número de páginas, objetivo educativo y nombre. Usa `templates/book-production-brief.md`.

## 2. Crear ilustraciones
Usa `docs/PROMPTS-CHATGPT.md`. Genera cada página por separado y revisa anatomía, limpieza de líneas, legibilidad y adecuación a la edad.

## 3. Maquetar en Canva
Sigue `docs/GUIA-CANVA.md`. Crea interior y portada, exporta el PDF y revisa todas las páginas.

## 4. Añadir archivos
- Portada: `public/images/covers/`
- PDF: `public/books/`
- Ficha Markdown: `src/content/books/`

Copia `templates/book-template.md` y completa todos los campos. El slug debe ser único, en minúsculas y con guiones.

## 5. Validar
Ejecuta `npm test`, `npm run validate`, `npm run check` y `npm run build`. No cambies `draft: false` hasta que portada y PDF final existan.

## 6. Publicar
Haz commit y push a `main`. GitHub Actions valida, prueba, construye y publica el sitio. Comprueba la página y descarga el PDF desde un navegador.

## 7. Mantener
Conserva archivos fuente, registra licencias y mantén copias de seguridad de los PDF.
