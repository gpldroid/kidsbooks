# Contribuir a kids books

Gracias por ayudar a mejorar la biblioteca.

## Añadir un libro
1. Crea la portada en `public/images/covers/`.
2. Añade el PDF final en `public/books/`.
3. Copia `templates/book-template.md` en `src/content/books/`.
4. Completa los campos y usa un slug único.
5. Cambia `draft` a `false` cuando todos los archivos estén listos.

## Comprobaciones
```bash
npm install
npm test
npm run validate
npm run check
npm run build
```

## Criterios
- Mantén el contenido en español.
- Usa imágenes originales o con licencia compatible.
- No añadas backend, base de datos, analítica invasiva ni dependencias de pago.
- Mantén el diseño accesible y adaptable.
- No subas archivos temporales ni imágenes sin revisar.
