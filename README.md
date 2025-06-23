# 🎭 Pirámide Interactiva con Scroll

Visualizador interactivo que muestra 21 imágenes organizadas en formación piramidal con efectos de scroll cinemáticos.

## 🚀 Características

- **21 imágenes** organizadas en 4 filas piramidales
- **Animaciones suaves** activadas por scroll
- **Imágenes completas** sin recortes (object-fit: contain)
- **Responsive** se adapta al tamaño de pantalla
- **Elemento principal** siempre visible en el centro
- **Modal informativo** al hacer clic en cualquier imagen

## 📁 Estructura del Proyecto

```
fosas-scroll/
├── index.html                    # Página principal
├── styles.css                    # Estilos y diseño
├── script.js                     # Lógica y animaciones
├── PERSONAJES PRESENTACION/      # Carpeta con las imágenes
│   ├── Sin ti╠ütulo-4.png       # Imagen principal
│   ├── Sin ti╠ütulo-41.png      # Imagen 2
│   ├── Sin ti╠ütulo-422.png     # Imagen 3
│   └── ... (21 imágenes total)
└── README.md                     # Esta documentación
```

## 🎮 Cómo Usar

1. **Abrir**: Doble clic en `index.html` o abrir en navegador
2. **Scroll**: Desplázate hacia abajo para ver aparecer las imágenes
3. **Clic**: Haz clic en cualquier imagen para ver información
4. **Modal**: Cierra con la "×" o haciendo clic fuera

## ⚙️ Configuración Actual

### Distribución de Imágenes

- **Elemento principal**: Centro de la pantalla (220×330px)
- **Fila 1**: 4 elementos (-200px del centro)
- **Fila 2**: 6 elementos (-280px del centro)
- **Fila 3**: 8 elementos (-360px del centro)
- **Fila 4**: 2 elementos (-440px del centro)

### Tecnologías

- **HTML5** + **CSS3** + **JavaScript ES6**
- **GSAP** para animaciones
- **ScrollTrigger** para efectos de scroll
- **Lenis** para scroll suave

## 🛠️ Personalización

### Cambiar Imágenes

Reemplaza las imágenes en la carpeta `PERSONAJES PRESENTACION/` manteniendo los mismos nombres o actualiza las rutas en `script.js` línea 19.

### Modificar Distribución

Edita `piramideConfig` en `script.js` línea 45 para cambiar:

- Número de elementos por fila
- Posición vertical (`offsetY`)
- Orden de profundidad (`zIndex`)

### Ajustar Tamaños

Modifica en `styles.css`:

- `.cuadro`: Tamaño de imágenes normales (200×300px)
- `.cuadro.head`: Tamaño de imagen principal (220×330px)

## 🔧 Debug

El proyecto incluye herramientas de debug en la consola:

- `mostrarEstructuraPiramide()`: Muestra la distribución completa
- `cambiarImagen(numero, ruta)`: Cambia una imagen específica
- Monitor de rendimiento en tiempo real (esquina superior derecha)

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones modernas)
- ✅ Responsive design para móviles y tablets
- ✅ No requiere servidor web (funciona en local)

---

**Proyecto optimizado para visualización de personajes con efectos cinematográficos.**