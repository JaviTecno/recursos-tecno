# 🚀 TecnoRecursos - Web de Recursos Educativos

Web para organizar y compartir recursos de las asignaturas de Tecnología.

## 📁 Estructura del proyecto

```
web-recursos/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos de la web
├── js/
│   ├── data.js         # Datos de cursos y recursos (EDITAR AQUÍ)
│   └── main.js         # Lógica de navegación
├── contenidos/         # Carpeta para los archivos de recursos
│   ├── 1eso/
│   ├── 2eso/
│   ├── 3eso/
│   ├── 4eso/
│   ├── bach1/
│   └── bach2/
└── assets/
    └── img/            # Imágenes de la web
```

## ➕ Cómo añadir recursos

### Paso 1: Subir el archivo
Coloca el archivo (PDF, PPTX, etc.) en la carpeta correspondiente:
```
contenidos/[curso]/[asignatura]/[tipo]/archivo.pdf
```

Ejemplo:
```
contenidos/1eso/tecnologia/presentaciones/tema1-materiales.pdf
```

### Paso 2: Registrar en data.js
Abre `js/data.js` y añade el recurso en el array correspondiente:

```javascript
"1eso": {
    nombre: "1º ESO",
    asignaturas: {
        "tecnologia": {
            nombre: "Tecnología y Digitalización",
            recursos: {
                presentaciones: [
                    {
                        titulo: "Tema 1: Los Materiales",
                        archivo: "contenidos/1eso/tecnologia/presentaciones/tema1-materiales.pdf",
                        tipo: "PDF",
                        fecha: "2024-09-15"
                    }
                ],
                // ... más tipos
            }
        }
    }
}
```

### Campos de cada recurso

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `titulo` | Nombre que verá el alumno | "Tema 1: Introducción" |
| `archivo` | Ruta relativa al archivo | "contenidos/1eso/..." |
| `tipo` | Extensión del archivo | "PDF", "PPTX", "DOCX" |
| `fecha` | Fecha de creación (opcional) | "2024-09-15" |

## 🎨 Personalización

### Cambiar colores
En `css/styles.css`, modifica las variables CSS en `:root`:

```css
:root {
    --color-primary: #6366f1;      /* Color principal */
    --color-accent: #06b6d4;       /* Color de acento */
    /* ... más colores */
}
```

### Cambiar el nombre/logo
En `index.html`, busca la clase `.logo-title` y `.logo-subtitle`:

```html
<span class="logo-title">TecnoRecursos</span>
<span class="logo-subtitle">Prof. Javi</span>
```

### Añadir nuevas asignaturas
En `js/data.js`, añade una nueva entrada dentro del curso:

```javascript
"4eso": {
    nombre: "4º ESO",
    asignaturas: {
        "tecnologia": { ... },
        "robotica": {                    // Nueva asignatura
            nombre: "Robótica",
            recursos: {
                presentaciones: [],
                apuntes: [],
                actividades: [],
                examenes: []
            }
        }
    }
}
```

## 🌐 Subir a GitHub Pages

1. **Crear repositorio en GitHub**
   - Ve a github.com y crea un nuevo repositorio (ej: `recursos-tecnologia`)

2. **Subir los archivos**
   ```bash
   git init
   git add .
   git commit -m "Primera versión de la web"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/recursos-tecnologia.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ve a Settings > Pages
   - En "Source", selecciona "main" y "/ (root)"
   - Guarda y espera unos minutos

4. **¡Listo!**
   Tu web estará en: `https://tu-usuario.github.io/recursos-tecnologia`

## 📱 Características

- ✅ Diseño responsive (móvil, tablet, escritorio)
- ✅ Modo oscuro/claro
- ✅ Buscador de recursos
- ✅ Navegación con breadcrumbs
- ✅ Animaciones suaves
- ✅ Accesible (navegación por teclado)

## 🛠️ Ideas para futuras mejoras

- [ ] Filtros por fecha
- [ ] Favoritos con localStorage
- [ ] Vista de lista/grid
- [ ] Previsualización de PDFs
- [ ] Sistema de etiquetas
- [ ] Contador de descargas

---

💻 Hecho con cariño para clase
