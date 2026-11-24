# Taxonomía, rutas y SEO interno

## Estructura de rutas

- `/libros/`: catálogo de todos los libros publicados.
- `/libros/<slug>/`: ficha individual de cada libro.
- `/categorias/`: índice de categorías disponibles.
- `/categorias/<slug-de-categoria>/`: página temática con los libros de esa categoría.

Las rutas de categoría se generan automáticamente a partir de `category` y se normalizan mediante `src/utils/taxonomy.ts`. El índice, las tarjetas de inicio, las migas de pan y las fichas usan la misma función para evitar enlaces inconsistentes.

## Metadatos editoriales

Cada libro mantiene en su frontmatter:

- `category`: categoría principal única; determina su página temática.
- `keywords`: lista de frases específicas de búsqueda, no una lista de palabras repetidas.
- `description`: resumen visible y descripción SEO.
- `slug`: identificador estable de la ficha.
- `age`: rango usado por el filtro de edad.

Ejemplos de frases: `libro para colorear unicornios`, `dibujos de frutas para niños`, `libro de naturaleza para colorear`.

## Enlaces internos

1. Inicio enlaza a cada página de categoría.
2. El índice de categorías enlaza a todas las categorías con libros publicados.
3. Cada ficha enlaza a su categoría mediante migas de pan y etiqueta temática.
4. Las fichas muestran libros relacionados por categoría y coincidencia de palabras clave.
5. Las páginas de categoría enlazan al catálogo general y al índice de categorías.
6. El catálogo permite buscar por título, categoría, descripción y palabras clave.

## Reglas editoriales

- Usa una sola categoría principal por libro.
- Añade entre 4 y 8 frases precisas, naturales y diferentes por título.
- Evita repetir la misma frase con pequeñas variaciones.
- No crees categorías vacías: las páginas se generan a partir de libros publicados.
- Conserva slugs existentes una vez que una ficha esté publicada.
- Los enlaces internos deben usar rutas locales compatibles con la base `/kidsbooks/`.

## Nota SEO

El campo HTML `meta keywords` se conserva como metadato complementario, pero no es una señal principal de posicionamiento en Google. La prioridad es la coherencia temática entre títulos, descripciones, contenido visible, categorías, datos estructurados y enlaces internos.
