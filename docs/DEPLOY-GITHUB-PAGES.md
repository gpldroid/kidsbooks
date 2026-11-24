# Publicar en GitHub Pages

Configuración actual del repositorio `gpldroid/kidsbooks`:

- URL: https://gpldroid.github.io/kidsbooks/
- Dominio: `https://gpldroid.github.io`
- Ruta base Astro: `/kidsbooks`

## Activar Pages
1. Abre Settings → Pages.
2. En Build and deployment, selecciona **GitHub Actions** como Source.
3. Abre Actions y revisa el workflow **Build and deploy Astro to GitHub Pages**.
4. Haz push a `main` o ejecuta el workflow manualmente.
5. Revisa los trabajos Build y Deploy.

## Publicar cambios
```bash
git add .
git commit -m "content: add new coloring book"
git push origin main
```

Si cambias el nombre del repositorio, actualiza `base` en `astro.config.mjs` y la URL del sitemap en `public/robots.txt`.

GitHub Pages en GitHub Free requiere un repositorio público. No debe utilizarse para un sitio cuya finalidad principal sea facilitar transacciones comerciales o comercio electrónico.
