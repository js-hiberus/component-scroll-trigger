# 📋 DOCUMENTACIÓN COMPLETA - PIRÁMIDE INTERACTIVA

## 🎯 **DESCRIPCIÓN DEL PROYECTO**

Este proyecto crea un efecto visual interactivo donde 50 cartas se organizan en una formación piramidal. Al hacer scroll, las cartas aparecen progresivamente desde pequeñas y transparentes hasta su tamaño y opacidad final, creando un efecto cinemático impresionante.

---

## 📁 **ESTRUCTURA DE ARCHIVOS**

```
proyecto-piramide/
├── index.html          # Archivo principal HTML
├── styles.css          # Todos los estilos CSS
├── script.js           # Lógica JavaScript
├── data/
│   ├── personas.json   # Datos de ejemplo (opcional)
│   ├── imagenes/       # Carpeta para imágenes (opcional)
│   └── svg/           # Carpeta para SVGs (opcional)
└── README.md           # Esta documentación
```

---

## 🚀 **CÓMO USAR EL PROYECTO**

### **1. Instalación**
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesita servidor web

### **2. Navegación**
- **Scroll hacia abajo**: Las cartas aparecen progresivamente
- **Scroll hacia arriba**: Las cartas desaparecen en orden inverso
- **Clic en cualquier carta**: Abre un modal con información detallada
- **Clic en ×**: Cierra el modal

---

## 📊 **IMPLEMENTACIÓN CON DATOS EXTERNOS**

### **🔧 1. IMPLEMENTACIÓN CON JSON**

#### **Estructura del archivo JSON recomendada:**
```json
{
  "personas": [
    {
      "id": 1,
      "nombre": "Ana García",
      "cargo": "Directora General",
      "departamento": "Dirección",
      "imagen": "imagenes/ana-garcia.jpg",
      "biografia": "Directora con 15 años de experiencia...",
      "email": "ana.garcia@empresa.com"
    },
    {
      "id": 2,
      "nombre": "Carlos López",
      "cargo": "Jefe de Desarrollo",
      "departamento": "Tecnología",
      "imagen": "imagenes/carlos-lopez.jpg",
      "biografia": "Desarrollador senior especializado en...",
      "email": "carlos.lopez@empresa.com"
    }
  ]
}
```

#### **Cómo implementarlo:**

**1. Crear el archivo `data/personas.json` con tus datos**

**2. Modificar `script.js` para cargar los datos:**
```javascript
// Agregar al inicio del archivo
let datosPersonas = [];

// Función para cargar datos JSON
async function cargarDatosJSON() {
  try {
    const response = await fetch('data/personas.json');
    const data = await response.json();
    datosPersonas = data.personas;
    console.log('✅ Datos cargados:', datosPersonas.length, 'elementos');
  } catch (error) {
    console.error('❌ Error cargando datos:', error);
    // Usar datos por defecto si no se pueden cargar
    datosPersonas = generarDatosPorDefecto();
  }
}

// Modificar la función crearCuadro para usar los datos
function crearCuadro(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  // Usar datos del JSON si están disponibles
  const persona = datosPersonas[i] || { nombre: `Persona ${i + 1}`, cargo: 'N/A' };
  
  if (i === 0) {
    div.classList.add("head");
    div.innerHTML = `<span>${persona.nombre}</span>`;
  } else {
    div.innerHTML = `
      <div class="carta-contenido">
        <span class="numero">${i + 1}</span>
        <span class="nombre">${persona.nombre}</span>
      </div>
    `;
  }
  
  // ... resto del código
}

// Inicializar carga de datos
cargarDatosJSON().then(() => {
  requestIdleCallback(crearCuadrosProgresivamente);
});
```

#### **CSS adicional para contenido JSON:**
```css
.carta-contenido {
  text-align: center;
  padding: 5px;
}

.numero {
  font-size: 14px;
  opacity: 0.7;
}

.nombre {
  font-size: 12px;
  font-weight: normal;
  display: block;
  margin-top: 5px;
}
```

---

### **🖼️ 2. IMPLEMENTACIÓN CON IMÁGENES**

#### **Formatos soportados recomendados:**
- **WEBP**: Mejor compresión, soporte moderno
- **JPEG**: Fotos con muchos colores
- **PNG**: Imágenes con transparencia
- **SVG**: Iconos y gráficos vectoriales

#### **Estructura de carpetas:**
```
imagenes/
├── webp/          # Formato principal (mejor rendimiento)
│   ├── persona-1.webp
│   ├── persona-2.webp
│   └── ...
├── jpg/           # Fallback para navegadores antiguos
│   ├── persona-1.jpg
│   └── ...
└── thumbnails/    # Versiones pequeñas para mejor rendimiento
    ├── persona-1-thumb.webp
    └── ...
```

#### **Implementación con imágenes:**
```javascript
function crearCuadroConImagen(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  const persona = datosPersonas[i] || {};
  
  div.innerHTML = `
    <div class="carta-imagen">
      <picture>
        <source srcset="imagenes/webp/persona-${i + 1}.webp" type="image/webp">
        <img src="imagenes/jpg/persona-${i + 1}.jpg" 
             alt="${persona.nombre || 'Persona ' + (i + 1)}"
             loading="lazy">
      </picture>
      <div class="carta-overlay">
        <span class="nombre">${persona.nombre || 'Persona ' + (i + 1)}</span>
        <span class="cargo">${persona.cargo || ''}</span>
      </div>
    </div>
  `;
  
  // ... resto del código
}
```

#### **CSS para cartas con imágenes:**
```css
.carta-imagen {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.carta-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cuadro:hover .carta-imagen img {
  transform: scale(1.1);
}

.carta-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 10px;
  text-align: center;
}

.nombre {
  font-size: 12px;
  font-weight: bold;
  display: block;
}

.cargo {
  font-size: 10px;
  opacity: 0.8;
  display: block;
}
```

---

### **🎨 3. IMPLEMENTACIÓN CON SVG**

#### **Ventajas del SVG:**
- Escalable sin pérdida de calidad
- Tamaño de archivo muy pequeño
- Personalizable con CSS
- Ideal para iconos y avatares

#### **Ejemplo de implementación:**
```javascript
function crearCuadroConSVG(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  const persona = datosPersonas[i] || {};
  const colorPrimario = persona.color || '#3498db';
  const iniciales = obtenerIniciales(persona.nombre || `P${i + 1}`);
  
  div.innerHTML = `
    <div class="carta-svg">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="${colorPrimario}" opacity="0.8"/>
        <text x="30" y="35" font-family="Arial" font-size="20" 
              font-weight="bold" text-anchor="middle" fill="white">
          ${iniciales}
        </text>
      </svg>
      <div class="carta-info">
        <span class="nombre">${persona.nombre || 'Persona ' + (i + 1)}</span>
        <span class="departamento">${persona.departamento || ''}</span>
      </div>
    </div>
  `;
  
  // ... resto del código
}

function obtenerIniciales(nombre) {
  return nombre.split(' ')
               .map(palabra => palabra[0])
               .join('')
               .substring(0, 2)
               .toUpperCase();
}
```

---

## ⚡ **LÍMITES DE RENDIMIENTO Y OPTIMIZACIÓN**

### **📊 Límites Recomendados:**

#### **1. NÚMERO DE ELEMENTOS:**
| Tipo de Contenido | Límite Recomendado | Límite Máximo |
|-------------------|-------------------|---------------|
| Solo texto        | 100 elementos    | 200 elementos |
| Con SVG          | 80 elementos     | 150 elementos |
| Con imágenes     | 50 elementos     | 100 elementos |
| Imágenes HD      | 30 elementos     | 60 elementos  |

#### **2. TAMAÑO DE ARCHIVOS:**
| Tipo | Tamaño Recomendado | Tamaño Máximo |
|------|-------------------|---------------|
| JSON | < 500 KB          | < 2 MB        |
| Imagen individual | < 100 KB | < 500 KB |
| SVG | < 10 KB | < 50 KB |
| Total de imágenes | < 5 MB | < 20 MB |

#### **3. DIMENSIONES DE IMÁGENES:**
```javascript
// Tamaños recomendados para las cartas
const tamanosImagen = {
  thumbnail: '150x200px',  // Para vista de pirámide
  medium: '300x400px',     // Para modal ampliado
  large: '600x800px'       // Solo si es necesario
};
```

### **🚀 Técnicas de Optimización:**

#### **1. Lazy Loading de Imágenes:**
```javascript
// Cargar imágenes solo cuando sean necesarias
function configurarLazyLoading(img) {
  img.setAttribute('loading', 'lazy');
  img.setAttribute('data-src', img.src);
  img.removeAttribute('src');
  
  // Usar Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  observer.observe(img);
}
```

#### **2. Carga Progresiva de Datos:**
```javascript
// Cargar datos en lotes para mejorar rendimiento inicial
async function cargarDatosPorLotes(batchSize = 20) {
  const totalElementos = datosPersonas.length;
  
  for (let i = 0; i < totalElementos; i += batchSize) {
    const lote = datosPersonas.slice(i, i + batchSize);
    await procesarLote(lote);
    
    // Pausa entre lotes para no bloquear la UI
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
```

#### **3. Optimización de Imágenes:**
```javascript
// Detectar y usar el formato óptimo
function obtenerFormatoOptimo() {
  const canvas = document.createElement('canvas');
  
  // Detectar soporte WebP
  if (canvas.toDataURL('image/webp').indexOf('webp') > -1) {
    return 'webp';
  }
  
  // Fallback a JPEG
  return 'jpg';
}

// Usar imágenes responsivas
function crearImagenResponsiva(persona, index) {
  const formato = obtenerFormatoOptimo();
  
  return `
    <picture>
      <source media="(max-width: 768px)" 
              srcset="imagenes/thumbnails/persona-${index}.${formato}">
      <source media="(min-width: 769px)" 
              srcset="imagenes/medium/persona-${index}.${formato}">
      <img src="imagenes/thumbnails/persona-${index}.jpg" 
           alt="${persona.nombre}"
           loading="lazy">
    </picture>
  `;
}
```

#### **4. Monitoreo de Rendimiento:**
```javascript
// Agregar al script.js
function monitorearRendimiento() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`📊 ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    }
  });
  
  observer.observe({entryTypes: ['measure']});
}

// Medir tiempos de carga
function medirTiempoCarga(nombre, funcion) {
  performance.mark(`${nombre}-inicio`);
  const resultado = funcion();
  performance.mark(`${nombre}-fin`);
  performance.measure(nombre, `${nombre}-inicio`, `${nombre}-fin`);
  return resultado;
}
```

### **⚠️ Señales de Problemas de Rendimiento:**

#### **Síntomas a vigilar:**
- FPS consistentemente < 30
- Tiempo de carga inicial > 3 segundos
- Scroll con lag o saltos
- Memoria > 100 MB en navegadores móviles
- Tiempo de respuesta al clic > 100ms

#### **Soluciones rápidas:**
```javascript
// Reducir elementos si el rendimiento es malo
function ajustarRendimientoDinamico() {
  const navegadorLento = performance.memory && 
                        performance.memory.usedJSHeapSize > 50 * 1024 * 1024;
  
  if (navegadorLento) {
    total = Math.min(total, 30); // Reducir a 30 elementos
    console.warn('🐌 Rendimiento reducido detectado, limitando elementos');
  }
}
```

---

## 🔍 **FUNCIONES DE DEBUG**

### **En la Consola del Navegador:**

#### **Ver estructura completa:**
```javascript
mostrarEstructuraPiramide()
```

#### **Variables disponibles:**
```javascript
total              // Número total de cartas
cuadrosVisibles   // Cartas actualmente visibles
posicionesUsadas  // Array con todas las posiciones calculadas
piramideConfig    // Configuración de la pirámide
datosPersonas     // Datos cargados del JSON (si aplica)
```

#### **Funciones de debug adicionales:**
```javascript
// Ver rendimiento actual
console.log('📊 Memoria:', performance.memory);
console.log('🚀 FPS actual:', fps);

// Ver datos cargados
console.table(datosPersonas);

// Forzar recarga de datos
cargarDatosJSON();
```

---

## 🛠️ **RESOLUCIÓN DE PROBLEMAS**

### **❌ Las cartas no aparecen:**
- Verifica que los archivos JS y CSS estén enlazados correctamente
- Revisa la consola del navegador para errores
- Asegúrate de hacer scroll hacia abajo

### **❌ Las cartas se solapan:**
- Aumenta `espacioEntreElementos` en `script.js` línea 73
- Reduce el número de `elementos` por fila en `piramideConfig`
- Verifica que `window.innerWidth` sea suficiente

### **❌ Rendimiento lento:**
- Reduce el número total de cartas
- Aumenta los valores de `delayGrupo` para espaciar más las animaciones
- Reduce la complejidad visual (blur, sombras) en CSS

### **❌ Las cartas salen de la pantalla:**
- Ajusta `maxAnchoDisponible` a un porcentaje menor (línea 72)

### **❌ Problemas con datos JSON:**
- Verifica que el archivo JSON tenga formato válido
- Usa un validador JSON online
- Revisa la ruta del archivo en la función `fetch()`
- Asegúrate de que el servidor permita cargar archivos locales

### **❌ Imágenes no cargan:**
- Verifica que las rutas de las imágenes sean correctas
- Comprueba que los archivos existan en las carpetas indicadas
- Usa rutas relativas, no absolutas
- Implementa fallbacks para imágenes faltantes