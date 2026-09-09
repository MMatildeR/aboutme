# Sitio de María Matilde Rodríguez

Portfolio personal — HTML, CSS y JavaScript puro. Sin frameworks, sin backend, sin paso de build.

## Estructura

```
site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── img/            # foto de perfil
│   └── behance/         # piezas de proyectos (versiones optimizadas para web)
└── README.md
```

## Ver el sitio en local

No hace falta instalar nada: alcanza con abrir `index.html` en el navegador (doble clic, o arrastrarlo a una pestaña).

## Publicar en GitHub

1. Creá un repositorio nuevo en GitHub (por ejemplo `maria-matilde-rodriguez-portfolio`).
2. Desde esta carpeta (`site/`), en la terminal:
   ```
   git init
   git add .
   git commit -m "Primera versión del sitio"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<nombre-del-repo>.git
   git push -u origin main
   ```
   > Importante: subí el **contenido de esta carpeta `site/`** como raíz del repositorio (no la carpeta del proyecto completa con los CV, RTF, etc.), para que Netlify no necesite configuración extra.

## Publicar en Netlify (gratis)

**Opción rápida — arrastrar y soltar:**
1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastrá la carpeta `site/` completa.
3. Netlify te da una URL al instante (se puede cambiar el subdominio en "Site settings").

**Opción con repositorio (recomendada, para poder actualizar el sitio con cada `git push`):**
1. En Netlify: "Add new site" → "Import an existing project" → conectá tu cuenta de GitHub.
2. Elegí el repositorio que creaste.
3. Build command: dejar vacío. Publish directory: `.` (la raíz del repo, ya que `site/` es la raíz).
4. "Deploy site".

Cada vez que hagas `git push` a `main`, Netlify vuelve a publicar el sitio automáticamente.

## Actualizar contenido

- Textos: editar directamente en `index.html`. Cada bloque de texto tiene una versión en español (`data-lang="es"`) y otra en inglés (`data-lang="en"`) — mantener ambas al día.
- Colores y tipografía: variables al principio de `css/styles.css` (`:root`).
- Imágenes de proyectos: agregar el archivo optimizado en `assets/behance/` y referenciarlo en `index.html`.
