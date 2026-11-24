# Estándar editorial y técnico para libros para colorear

Versión 1.0 · Obligatorio para libros nuevos · Idioma predeterminado: español

Este estándar hace que cada libro pueda producirse de nuevo con el mismo proceso y resultados previsibles. Cada libro necesita un brief aprobado, un mapa completo de páginas, archivos con nombres predecibles y una revisión del PDF exportado. Toda excepción debe justificarse en el brief antes de maquetar.

## 1. Principios obligatorios

1. Contenido original, seguro y apropiado para la edad indicada.
2. No usar personajes, marcas, tipografías ni recursos de terceros sin derechos suficientes para reproducirlos y distribuirlos.
3. Revisar el PDF final, no solo el archivo de diseño.
4. El número de páginas de los metadatos debe coincidir exactamente con el PDF.
5. Cada página debe tener un propósito registrado en el mapa de páginas.
6. No publicar con validaciones fallidas o incidencias visuales pendientes.

## 2. Formato físico predeterminado

| Propiedad | Estándar |
|---|---|
| Papel | A4 |
| Dimensiones | 210 × 297 mm |
| Orientación | Vertical |
| Resolución raster | 300 dpi como mínimo |
| Tamaño raster equivalente | 2480 × 3508 px aprox. |
| Interior | Blanco puro (#FFFFFF) y negro puro (#000000) |
| Margen seguro | 10 mm como mínimo |
| Entrega | PDF listo para imprimir |

A4 vertical es el estándar de la biblioteca. US Letter u horizontal requieren justificación y aprobación en el brief. No mezclar tamaños ni orientaciones dentro del mismo PDF. No ampliar imágenes pequeñas para simular 300 dpi. Mantener los dibujos vectoriales siempre que sea posible. No usar sangrado en páginas interiores; la portada solo lo llevará si lo exige la imprenta.

## 3. Ilustraciones interiores

Cada página debe contener una sola escena o composición, nunca varias páginas en una cuadrícula.

- Fondo blanco limpio y contornos negros.
- Sin sombras, grises, degradados, texturas, tramados ni áreas de color.
- Contornos cerrados y nítidos; grosor recomendado de 2–3 pt en tamaño final.
- Formas amplias y zonas coloreables, con complejidad acorde a la edad.
- Composición centrada dentro del margen seguro.
- Ningún elemento importante cortado por los bordes.
- Sin texto, números, marcas de agua, firmas ni logotipos sobre el dibujo.
- Evitar detalles diminutos que se pierdan al imprimir.

La portada puede ser a color, pero debe compartir tema y título con el interior. Mantener coherencia de estilo entre todas las ilustraciones.

### Complejidad según la edad

- 3–4 años: objetos grandes, pocos elementos, contornos simples y zonas amplias.
- 4–6 años: escenas sencillas, formas reconocibles y detalles medianos.
- 6–8 años: más elementos y detalles moderados, sin saturar la página.
- 8+ años: mayor complejidad, manteniendo áreas útiles para colorear.

La edad declarada debe corresponder a la complejidad real.

## 4. Secuencia editorial predeterminada

Para libros con portada, bienvenida, dibujos con reverso protector y contraportada:

1. Página 1: portada a color.
2. Página 2: bienvenida o instrucciones breves en el idioma del libro.
3. Por cada ilustración: una página de dibujo seguida de una página completamente blanca.
4. Última página: contraportada.

Con N ilustraciones, esta secuencia produce 2N + 3 páginas. Ejemplo: 25 ilustraciones producen 53 páginas.

Las páginas protectoras deben estar realmente vacías: sin texto, numeración, cabeceras, pies, marcas ni ilustraciones. Si un libro no necesita bienvenida o páginas protectoras, documentar cada página en el brief y calcular el total según ese mapa. No añadir páginas vacías accidentales ni duplicar dibujos para alcanzar un número objetivo.

## 5. Tipografía y textos

- Idioma predeterminado: español; revisar tildes, signos de apertura y ortografía.
- Usar una o dos familias tipográficas legibles por libro.
- El título debe ser legible también en miniatura.
- La bienvenida debe ser breve, clara y apropiada para la edad.
- Evitar bloques densos, fuentes demasiado finas y texto decorativo difícil de leer.
- Incrustar las fuentes en el PDF o convertirlas de forma segura a contornos.
- No colocar texto en páginas que deban quedar en blanco.

## 6. Portada y contraportada

- La portada incluye el título exacto y una ilustración relacionada con el tema.
- Título, edad y descripción de la ficha deben coincidir con el PDF.
- La contraportada debe ser intencional, sin texto de prueba ni elementos de plantilla.
- Mantener coherencia visual entre portada, bienvenida y contraportada.
- Exportar la portada del sitio como archivo independiente y optimizado.

## 7. Nombres y estructura de archivos

Usar un único slug en minúsculas, sin acentos ni caracteres especiales y separado por guiones.

Ejemplo:

~~~text
public/
  books/el-mundo-magico-de-los-unicornios.pdf
  images/covers/el-mundo-magico-de-los-unicornios.svg
src/content/books/
  el-mundo-magico-de-los-unicornios.md
~~~

El PDF, la portada y el Markdown comparten el mismo slug. No usar espacios, mayúsculas, tildes ni sufijos como final-final-v2. Mantener originales editables en el espacio editorial aprobado, no en public/. No sobrescribir silenciosamente una versión publicada: conservar la anterior y registrar el cambio.

## 8. Metadatos Astro

El frontmatter debe coincidir con src/content.config.ts.

| Campo | Regla |
|---|---|
| title | 3–90 caracteres |
| slug | Minúsculas, números y guiones; coincide con el nombre del archivo |
| description | 20–220 caracteres |
| age | Rango como 4-8 |
| pages | Entero positivo, máximo 200; total real del PDF |
| category | 2–40 caracteres |
| characters | Lista opcional de valores admitidos por el schema |
| cover | Ruta local que comienza por / |
| pdf | Ruta local que comienza por /; obligatoria al publicar |
| featured | Booleano |
| draft | Booleano |
| publishedAt | Fecha válida |

No añadir propiedades al frontmatter sin actualizar el schema y sus pruebas. Mantener draft: true mientras falte cualquier archivo o revisión. Usar draft: false solo al aprobar la publicación.

## 9. Exportación

Antes de exportar, confirmar tamaño, orientación, orden, resolución y márgenes. Usar exportación PDF para impresión/calidad alta. Evitar compresión que degrade los contornos y asegurarse de que el PDF no esté protegido por contraseña.

Después de exportar, abrir el PDF en un visor independiente. Una exportación sin errores no demuestra que el documento esté bien maquetado.

## 10. Control de calidad obligatorio

### Revisión técnica
- [ ] El archivo existe, no está vacío y tiene estructura PDF válida.
- [ ] El PDF abre sin errores y no solicita contraseña.
- [ ] El número de páginas coincide con el brief y el campo pages.
- [ ] Todas las páginas tienen dimensiones y orientación aprobadas.
- [ ] No hay páginas duplicadas, omitidas ni vacías por accidente.
- [ ] Las páginas protectoras previstas están completamente vacías.
- [ ] Portada y contraportada están en la posición correcta.
- [ ] Los recursos locales de portada y PDF existen.
- [ ] Los metadatos coinciden con el contenido real.

### Revisión visual página por página
- [ ] Revisar todas las páginas, no solo una muestra.
- [ ] Comprobar texto, tildes, alineación, márgenes y legibilidad.
- [ ] Comprobar que cada dibujo está completo, centrado y con contornos limpios.
- [ ] Comprobar que no hay manchas, artefactos, texto residual ni marcas de agua.
- [ ] Imprimir una página de prueba cuando sea posible.

### Validación del proyecto
Ejecutar desde la raíz:

~~~bash
npm install
npm test
npm run validate
npm run check
npm run build
npm run preview
~~~

Tras desplegar, abrir la ficha pública y descargar el PDF desde GitHub Pages. La publicación solo se considera completada cuando la descarga pública funciona.

## 11. Flujo obligatorio

1. Duplicar templates/book-production-brief.md y completar el mapa de páginas.
2. Aprobar tema, edad, número de dibujos y secuencia.
3. Generar y revisar ilustraciones individuales.
4. Diseñar portada, bienvenida, interiores y contraportada.
5. Exportar PDF y portada.
6. Ejecutar revisión técnica y visual de todas las páginas.
7. Añadir archivos a public/ y crear Markdown desde templates/book-template.md.
8. Ejecutar validaciones locales.
9. Cambiar draft: false solo cuando todo esté aprobado.
10. Hacer commit y esperar que GitHub Actions termine correctamente.
11. Verificar ficha y PDF en el sitio publicado.

## 12. Excepciones y versiones

Toda excepción de tamaño, orientación, secuencia, idioma o páginas protectoras debe justificarse y aprobarse en el brief antes del diseño. Registrar fecha, responsable de revisión, incidencias resueltas, commit de publicación y URL final. Cada actualización vuelve a pasar por todo el control de calidad.
