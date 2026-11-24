# Contribuir a kids books

Gracias por ayudar a mejorar la biblioteca.

## Añadir un libro

1. Define el contenido en `templates/book-production-brief.md`.
2. Crea una portada original en `public/images/covers/`.
3. Añade el PDF final en `public/books/`.
4. Copia `templates/book-template.md` en `src/content/books/`.
5. Completa todos los campos según `src/content.config.ts` y usa un slug único.
6. Mantén `draft: true` hasta que los recursos estén revisados y validados.
7. Cambia a `draft: false` solo cuando el PDF y la portada existan y todas las comprobaciones pasen.

## Comprobaciones locales

Requisitos: Node.js 22+ y npm 10+.

```bash
npm install
npm test
npm run validate
npm run check
npm run build
npm run preview
```

## Convenciones

- Mantén el contenido visible en español.
- Usa imágenes originales o con licencia compatible.
- No añadas backend, base de datos, analítica invasiva ni dependencias sin una necesidad clara.
- Reutiliza `Header.astro`, `BookCard.astro` y `SiteFooter.astro`; evita componentes duplicados.
- Mantén diseño accesible, adaptable y compatible con `prefers-reduced-motion`.
- Usa SVG inline para iconos simples.
- No subas archivos temporales, dependencias instaladas ni imágenes sin revisar.
- Conserva el archivo `P 01`: es el brief de referencia editorial del proyecto.

## Pull requests

Describe el motivo del cambio, enumera los archivos afectados y confirma que las comprobaciones anteriores se ejecutaron.