# Flujo estándar de producción de libros

Las reglas editoriales, técnicas, de impresión, paginación, nombres de archivo y control de calidad están definidas en el [Estándar editorial y técnico para libros para colorear](./ESTANDAR-PRODUCCION-LIBROS.md).

## Proceso operativo

1. Duplica templates/book-production-brief.md y completa el mapa de todas las páginas.
2. Define tema, edad, idioma, número de ilustraciones y secuencia antes de generar imágenes.
3. Genera una ilustración individual por página y revisa cada una.
4. Diseña portada, bienvenida, interiores y contraportada siguiendo el estándar.
5. Exporta el PDF para impresión y una portada independiente.
6. Revisa el PDF exportado página por página; confirma número de páginas, dimensiones, orientación y páginas blancas.
7. Guarda los archivos usando el mismo slug en las rutas indicadas por el estándar.
8. Crea la ficha desde templates/book-template.md y mantén draft: true.
9. Ejecuta todas las comprobaciones:

~~~bash
npm install
npm test
npm run validate
npm run check
npm run build
npm run preview
~~~

10. Cambia a draft: false solo después de aprobar el PDF y todos los checks.
11. Publica mediante GitHub Actions y verifica la ficha y el enlace de descarga.

## Regla de publicación

Un libro no está terminado por haber generado sus imágenes o exportado un PDF. Está listo solo cuando el PDF final se ha inspeccionado, sus metadatos coinciden, las validaciones pasan y el archivo publicado se puede descargar.
