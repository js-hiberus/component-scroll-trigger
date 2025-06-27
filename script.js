// ===== INICIALIZACIÓN Y CONFIGURACIÓN =====
gsap.registerPlugin(ScrollTrigger);

// Configuración principal
const total = 21; // Total de cartas a mostrar (ajustado al número de imágenes disponibles)
const piramide = document.getElementById("piramide");
const monitor = document.getElementById("monitor");
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let cuadrosVisibles = 0;

// ===== CONFIGURACIÓN DE FASES DEL SCROLL =====
let faseActual = 1; // 1 = Primera fase (pirámide), 2 = Segunda fase (nuevo personaje)
let personajeEspecialCreado = false;

// ===== ESTRUCTURA UNIFICADA: PERSONAJES CON IMÁGENES Y BOCADILLOS =====
const personajes = [
  // Personaje principal (ahora actúa como los demás)
  {
    id: 'personaje-1',
    imagen: 'PERSONAJES PRESENTACION/a6dead66-a24a-4bc3-ac05-16e287c81cee-1.png'
  },
  {
    id: 'personaje-2', 
    imagen: 'PERSONAJES PRESENTACION/1d61c3b9-d995-4505-8503-d9cd43fee078.png'
  },
  {
    id: 'personaje-3',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4.png'
  },
  {
    id: 'personaje-4',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-41.png'
  },
  {
    id: 'personaje-5',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-422.png'
  },
  {
    id: 'personaje-6',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4222.png'
  },
  {
    id: 'personaje-7',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-42222.png'
  },
  {
    id: 'personaje-8',
    imagen: 'PERSONAJES PRESENTACION/0263935d-60a4-4588-a8c0-2e5c53f39246.png'
  },
  {
    id: 'personaje-9',
    imagen: 'PERSONAJES PRESENTACION/05fe8d8a-f40c-466a-9eea-de67882e8462.png'
  },
  {
    id: 'personaje-10',
    imagen: 'PERSONAJES PRESENTACION/06758c23-507d-4e2a-b7d1-533a5398cd28.png'
  },
  {
    id: 'personaje-11',
    imagen: 'PERSONAJES PRESENTACION/10a655fe-2aef-445e-8efd-39463fbab1fe.png'
  },
  {
    id: 'personaje-12',
    imagen: 'PERSONAJES PRESENTACION/1ac87812-7157-4770-b3df-1c7bcd634660.png'
  },
  {
    id: 'personaje-13',
    imagen: 'PERSONAJES PRESENTACION/2f22cab5-4c85-46b9-ba3c-a218d7e30d03.png'
  },
  {
    id: 'personaje-14',
    imagen: 'PERSONAJES PRESENTACION/3647a5f1-7c43-4f49-b93f-fd814c750c2f.png'
  },
  {
    id: 'personaje-15',
    imagen: 'PERSONAJES PRESENTACION/3ad98faa-5620-48ae-9d5c-fc57a704d283-1.png'
  },
  {
    id: 'personaje-16',
    imagen: 'PERSONAJES PRESENTACION/56e4554d-262a-46d1-b055-12f4507b360e.png'
  },
  {
    id: 'personaje-17',
    imagen: 'PERSONAJES PRESENTACION/5ac2ad31-5805-4845-a673-f4425fe1a528.png'
  },
  {
    id: 'personaje-18',
    imagen: 'PERSONAJES PRESENTACION/981c1a0e-4572-462e-b816-ceef827c46f3.png'
  },
  {
    id: 'personaje-19',
    imagen: 'PERSONAJES PRESENTACION/a896d580-11b9-4584-a33a-f3ded7b7469b.png'
  },
  {
    id: 'personaje-20',
    imagen: 'PERSONAJES PRESENTACION/aabc9875-424e-452f-a2d3-8886ac9a6c6f.png'
  },
  {
    id: 'personaje-21',
    imagen: 'PERSONAJES PRESENTACION/d5b91333-ec05-45bc-94ee-b71e436502fe.png'
  }
];

// ===== CONFIGURACIÓN DEL PERSONAJE ESPECIAL SEGUNDA FASE =====
const personajeEspecial = {
  id: 'marcos-sanchez-viel',
  imagen: 'PERSONAJES PRESENTACION/d5b91333-ec05-45bc-94ee-b71e436502fe.png',
  posicion: {
    left: 1232,
    top: centerY - 509,
    width: 265,
    height: 1018
  }
};

// ===== CONFIGURACIÓN DE DISPOSICIÓN EXACTA SEGÚN IMAGEN =====
// Definimos manualmente la estructura de filas y posiciones
const disposicionManual = [
  // Primeros 3 personajes (índices 0, 1, 2)
  { fila: 0, posicion: 0, escala: 1.0, offsetY: 80, zIndex: 100 },
  { fila: 1, posicion: 1, escala: 0.92, offsetY: 30, zIndex: 90 },
  { fila: 1, posicion: 0, escala: 0.92, offsetY: 30, zIndex: 90 },
  // Segunda fila (5 personajes)
  { fila: 2, posicion: 0, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 1, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 2, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 3, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 4, escala: 0.82, offsetY: -30, zIndex: 80 },
  // Tercera fila (5 personajes)
  { fila: 3, posicion: 0, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 1, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 2, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 3, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 4, escala: 0.7, offsetY: -90, zIndex: 70 },
  // Cuarta fila (6 personajes)
  { fila: 4, posicion: 0, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 1, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 2, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 3, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 4, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 5, escala: 0.6, offsetY: -150, zIndex: 60 }
];

function encontrarPosicion(indice) {
  const totalFilas = [1, 2, 5, 5, 6];
  let fila = 0;
  let posEnFila = indice;
  for (let f = 0; f < totalFilas.length; f++) {
    if (posEnFila < totalFilas[f]) {
      fila = f;
      break;
    }
    posEnFila -= totalFilas[f];
  }
  
  // Si hay una disposición manual definida para este índice, usarla
  const manual = disposicionManual[indice];
  const escala = manual ? manual.escala : 0.5;
  const zIndex = manual ? manual.zIndex : 50;
  
  // AJUSTE PARA ÁREA EXPANDIDA Y MÁS ALTA
  // Área expandida horizontalmente y subida verticalmente
  const rectanguloAncho = window.innerWidth * 0.5;
  const rectanguloAlto = window.innerHeight * 0.25;
  
  // Centro desplazado hacia la izquierda y centralizado
  const centroX = window.innerWidth * 0.42;
  
  // Espaciado expandido dentro del rectángulo
  const personajesEnFila = totalFilas[fila];
  const espacioHorizontal = rectanguloAncho / Math.max(personajesEnFila, 1);
  
  // Posición horizontal expandida
  const inicioX = centroX - (rectanguloAncho / 2);
  const left = inicioX + (posEnFila + 0.5) * espacioHorizontal;
  
  // Posición vertical - PIRÁMIDE INVERTIDA AÚN MÁS ARRIBA
  const inicioY = window.innerHeight * 0.02;
  const espacioVertical = (window.innerHeight * 0.45) / 5;
  // Invertir el orden: fila 0 abajo (pico), fila 4 arriba (base)
  const filaInvertida = 4 - fila;
  const top = inicioY + filaInvertida * espacioVertical;
  
  return { left, top, fila, zIndex, escala };
}

// ===== CONFIGURACIÓN DE SCROLL SUAVE =====
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== FUNCIÓN PARA CREAR EL PERSONAJE ESPECIAL =====
function crearPersonajeEspecial() {
  if (personajeEspecialCreado) return;
  
  const div = document.createElement("div");
  div.classList.add("cuadro", "personaje-especial");
  div.id = personajeEspecial.id;
  
  // Aplicar posición y tamaño específicos
  div.style.left = `${personajeEspecial.posicion.left}px`;
  div.style.top = `${personajeEspecial.posicion.top}px`;
  div.style.width = `${personajeEspecial.posicion.width}px`;
  div.style.height = `${personajeEspecial.posicion.height}px`;
  div.style.zIndex = "100";
  
  // Crear estructura HTML
  div.innerHTML = `
    <img src="${encodeURI(personajeEspecial.imagen)}" 
         alt="${personajeEspecial.nombre}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;">
  `;
  
  // Inicialmente invisible
  gsap.set(div, { opacity: 0, x: 300 });
  
  piramide.appendChild(div);
  personajeEspecialCreado = true;
  
  return div;
}

/**
 * Crea una carta individual con imagen y animación
 */
function crearCuadro(i) {
  // TODOS los personajes (incluido el 21) siguen la misma lógica de pirámide
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  // Si es el personaje 21, añadir clase especial para protección contra cortina
  if (i === 20) {
    div.classList.add("personaje-especial");
  }

  // Asignar ID del personaje si existe
  if (personajes[i] && personajes[i].id) {
    div.id = personajes[i].id;
  }

  // Configuración específica para Personaje-21
  if (i === 20) {
    // Posición y tamaño específicos para Personaje-21 (mucho más grande)
    div.style.left = "1100px";
    div.style.top = `${(window.innerHeight - 1832) / 2}px`; // Centrado verticalmente
    div.style.width = "477px";
    div.style.height = "1832px";
    div.style.zIndex = "8000";
    div.style.position = "fixed";
  } else {
    // Resto de personajes siguen la disposición grupal fotográfica
    const { left, top, fila, zIndex, escala } = encontrarPosicion(i);
    
    // Aplicar posición y z-index
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;
    div.style.zIndex = zIndex;
  }

  // Calcular opacidad y escala para todos
  const { fila, escala } = encontrarPosicion(i);
  const opacidad = Math.max(0.8, 1 - fila * 0.05);
  
  // Crear estructura HTML SOLO con imagen
  div.innerHTML = `
    <img src="${encodeURI(personajes[i].imagen || personajes[0].imagen)}" 
         alt="Persona ${i + 1}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
         onerror="console.log('Error cargando imagen ${i + 1}'); this.style.display='none'; this.parentElement.style.background='rgba(255,255,255,0.1)'; this.parentElement.innerHTML='<span style=\\'color:white; font-size:12px; text-align:center; display:flex; align-items:center; justify-content:center; height:100%\\'>Imagen ${i + 1}</span>';">
  `;

  // ===== CONFIGURACIÓN DE ANIMACIÓN =====
  gsap.set(div, { opacity: 0 });

  // Calcular delay para aparición progresiva por filas (de atrás hacia adelante)
  let delayGrupo;
  
  // El personaje-21 siempre aparece al final de todo
  if (i === 20) {
    delayGrupo = 4500; // Aparece después de todos los demás
  } else if (fila === 0) {
    // Fila trasera aparece primero
    delayGrupo = 200 + (i * 150);
  } else if (fila === 1) {
    // Fila media-trasera aparece después
    delayGrupo = 1400 + ((i - 7) * 180);
  } else if (fila === 2) {
    // Fila media-frontal 
    delayGrupo = 2500 + ((i - 13) * 200);
  } else {
    // Fila frontal aparece al final
    delayGrupo = 3500 + ((i - 18) * 250);
  }

  console.log(`✨ Personaje-${i + 1} aparece (delay: ${delayGrupo}ms, fila: ${fila})`);

  ScrollTrigger.create({
    trigger: ".scroll-zone",
    start: `top+=${delayGrupo} top`,
    end: `top+=${delayGrupo + 50} top`,
    onEnter: () => {
      div.classList.add("mostrar");
      cuadrosVisibles++;
      
      // Aparición instantánea
      gsap.set(div, { 
        opacity: opacidad,
        scale: escala
      });
    },
    onLeaveBack: () => {
      div.classList.remove("mostrar");
      cuadrosVisibles--;
      
      // Desaparición instantánea
      gsap.set(div, { opacity: 0 });
    }
  });

  // Si es el personaje especial, colocarlo en el contenedor retrato-fijo
  // para aislarlo completamente del efecto cortina
  if (i === 20) {
    const retratoFijo = document.querySelector('.retrato-fijo');
    if (retratoFijo) {
      retratoFijo.appendChild(div);
      console.log('🖼️ Personaje-21 colocado en zona protegida (.retrato-fijo)');
    } else {
      // Fallback: crear el contenedor si no existe
      const escenaMultitud = document.querySelector('.escena-multitud');
      if (escenaMultitud) {
        const retratoFijoNew = document.createElement('div');
        retratoFijoNew.className = 'retrato-fijo';
        escenaMultitud.appendChild(retratoFijoNew);
        retratoFijoNew.appendChild(div);
        console.log('🖼️ Personaje-21 colocado en zona protegida (contenedor creado)');
      } else {
        piramide.appendChild(div);
        console.warn('⚠️ No se pudo aislar el personaje-21, colocado en pirámide');
      }
    }
  } else {
    piramide.appendChild(div);
  }
}

// ===== CREACIÓN PROGRESIVA DE ELEMENTOS =====
let i = 0;
function crearCuadrosProgresivamente(deadline) {
  while (i < total && deadline.timeRemaining() > 0) {
    crearCuadro(i);
    i++;
  }
  if (i < total) {
    requestIdleCallback(crearCuadrosProgresivamente);
  } else {
    console.log("✅ Pirámide completada:");
    console.log("📊 Distribución por filas:");
    console.log(`   Fila 1: 1 elemento`);
    console.log(`   Fila 2: 2 elementos`);
    console.log(`   Fila 3: 5 elementos`);
    console.log(`   Fila 4: 5 elementos`); 
    console.log(`   Fila 5: 6 elementos`);
    console.log(`📍 Total personajes: ${total} (todos en pirámide)`);
    
    // Verificar orden correcto
    verificarOrdenPersonaje21();
  }
}
requestIdleCallback(crearCuadrosProgresivamente);

// Función para verificar que el personaje-21 sea realmente el último
function verificarOrdenPersonaje21() {
  console.log("🔍 === VERIFICACIÓN ORDEN PERSONAJE-21 ===");
  
  let maxDelay = 0;
  let personajeConMaxDelay = 0;
  
  // Calcular todos los delays de personajes 1-21
  for (let i = 0; i < 21; i++) {
    const { fila } = encontrarPosicion(i);
    let delay;
    
    // El personaje-21 siempre aparece al final de todo
    if (i === 20) {
      delay = 4500; // Aparece después de todos los demás
    } else if (fila === 0) {
      delay = 200 + (i * 150);
    } else if (fila === 1) {
      delay = 1400 + ((i - 7) * 180);
    } else if (fila === 2) {
      delay = 2500 + ((i - 13) * 200);
    } else {
      delay = 3500 + ((i - 18) * 250);
    }
    
    if (delay > maxDelay) {
      maxDelay = delay;
      personajeConMaxDelay = i + 1;
    }
  }
  
  console.log(`📊 Personaje con delay más alto: Personaje-${personajeConMaxDelay} (${maxDelay}ms)`);
  if (personajeConMaxDelay === 21) {
    console.log(`✅ Personaje-21 configurado como ÚLTIMO en aparecer (${maxDelay}ms)`);
  } else {
    console.warn(`⚠️ Personaje-21 NO es el último - revisar configuración`);
  }
  console.log(`✅ Todos los personajes configurados correctamente`);
  console.log("=" .repeat(50));
}

// ===== MONITOREO DE RENDIMIENTO =====
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

setInterval(() => {
  if (performance.memory) {
    const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
    monitor.innerHTML = `🧱 Cuadros visibles: ${cuadrosVisibles}<br>🧠 Memoria: ${usedMB} MB<br>🚀 FPS: ${fps}<br>🏗️ Filas piramidales: ${disposicionManual.length}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
  } else {
    monitor.innerHTML = `🧱 Cuadros visibles: ${cuadrosVisibles}<br>🧠 Memoria: N/D<br>🚀 FPS: ${fps}<br>🏗️ Filas piramidales: ${disposicionManual.length}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
  }
}, 500);

function trackFPS(now) {
  frameCount++;
  const delta = now - lastTime;
  if (delta >= 1000) {
    fps = Math.round((frameCount / delta) * 1000);
    frameCount = 0;
    lastTime = now;
  }
  requestAnimationFrame(trackFPS);
}
requestAnimationFrame(trackFPS);

// ===== FUNCIONES DE DEBUG =====

/**
 * Función para mostrar la estructura completa de la pirámide en consola
 */
window.mostrarEstructuraPiramide = () => {
  console.log("🏗️ ESTRUCTURA DE LA PIRÁMIDE:");
  console.log("=" .repeat(50));
  
  disposicionManual.forEach((config, filaIndex) => {
    const elementos = [];
    for (let i = 0; i < config.elementos; i++) {
      elementos.push(i + 1);
    }
    console.log(`Fila ${filaIndex + 1}: [${elementos.join(', ')}] (${config.elementos} elementos)`);
  });
  
  console.log("=" .repeat(50));
  console.log(`Total elementos (sin contar head): ${disposicionManual.length}`);
};

// ===== FUNCIÓN PARA CAMBIAR IMÁGENES DINÁMICAMENTE =====

/**
 * Función para actualizar una imagen específica
 * Uso: cambiarImagen(numeroDeElemento, 'nueva-url-imagen.jpg')
 */
window.cambiarImagen = (numeroElemento, nuevaURL) => {
  if (numeroElemento < 1 || numeroElemento > total) {
    console.error(`Elemento ${numeroElemento} no existe. Debe estar entre 1 y ${total}`);
    return;
  }
  
  // Actualizar en el array
  personajes[numeroElemento - 1].imagen = nuevaURL;
  
  // Actualizar en el DOM si ya existe
  const elementos = document.querySelectorAll('.cuadro');
  if (elementos[numeroElemento - 1]) {
    const img = elementos[numeroElemento - 1].querySelector('img');
    if (img) {
      img.src = nuevaURL;
      console.log(`✅ Imagen del elemento ${numeroElemento} actualizada`);
    }
  }
};

// Ejecutar automáticamente para debug
setTimeout(() => {
  window.mostrarEstructuraPiramide();
  console.log("✅ Usando imágenes de la carpeta PERSONAJES PRESENTACION");
  console.log(`📁 ${personajes.length} imágenes disponibles`);
  console.log(`🎯 Total elementos configurados: ${total}`);
  console.log(`📊 Distribución: Todos en pirámide = ${total} total`);
  console.log("💡 Para cambiar una imagen específica, ejecuta: cambiarImagen(numero, 'ruta-imagen.jpg')");
  
  // Verificar que las imágenes se puedan cargar
  verificarImagenes();
  
  // Mostrar conteo de elementos visibles después de un momento
  setTimeout(() => {
    const elementosEnDOM = document.querySelectorAll('.cuadro').length;
    console.log(`🧱 Elementos creados en DOM: ${elementosEnDOM}`);
    console.log(`📈 Elementos visibles actualmente: ${cuadrosVisibles}`);
  }, 2000);
}, 1000);

// ===== VERIFICACIÓN DE IMÁGENES =====
/**
 * Función para verificar si las imágenes existen y pueden cargarse
 */
function verificarImagenes() {
  console.log("🔍 Verificando carga de imágenes...");
  
  personajes.forEach((personaje, index) => {
    const img = new Image();
    const rutaCodificada = encodeURI(personaje.imagen);
    img.onload = () => {
      console.log(`✅ Imagen ${index + 1} cargada: ${personaje.imagen}`);
    };
    img.onerror = () => {
      console.error(`❌ Error cargando imagen ${index + 1}: ${personaje.imagen}`);
      console.error(`   Ruta codificada: ${rutaCodificada}`);
    };
    img.src = rutaCodificada;
  });
}

// ===== NUEVA SECCIÓN: ESCENA DE MULTITUD =====

/**
 * Función para generar nombre alt a partir del nombre de archivo
 * @param {string} rutaImagen - Ruta de la imagen
 * @returns {string} - Texto alt descriptivo
 */
function generarAltText(rutaImagen) {
  const nombreArchivo = rutaImagen.split('/').pop().split('.')[0];
  return `Personaje ${nombreArchivo}`;
}

/**
 * Inicializar la escena de multitud
 */
function inicializarEscenaMultitud() {
  const multitudContainer = document.querySelector('.multitud');
  const retratoFijoContainer = document.querySelector('.retrato-fijo');
  
  if (!multitudContainer || !retratoFijoContainer) {
    console.warn('⚠️ Contenedores de multitud no encontrados');
    return;
  }

  // Configurar la animación de cortina ascendente
  configurarAnimacionCortina();
  
  console.log(`✅ Escena de personaje especial inicializada: Solo personaje especial visible (sin multitud)`);
}

/**
 * Configurar la animación de cortina ascendente con GSAP
 */
function configurarAnimacionCortina() {
  const multitudElement = document.querySelector('.multitud');
  const espacioBElement = document.querySelector('.espacio-b');
  
  if (!multitudElement || !espacioBElement) {
    console.warn('⚠️ Elementos para animación de cortina no encontrados');
    return;
  }

  // Verificar si el usuario prefiere movimiento reducido
  const prefieereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefieereMovimientoReducido) {
    // Versión simplificada sin máscara para accesibilidad
    gsap.timeline({
      scrollTrigger: {
        trigger: espacioBElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
                 onUpdate: (self) => {
           // Aplicar solo cambio de opacidad sin máscara
           const progress = self.progress;
           multitudElement.style.opacity = Math.max(0, 1 - progress);
           
           // Proteger siempre al personaje especial original (ahora en .retrato-fijo)
           const personajeEspecialOriginal = document.querySelector('.retrato-fijo .cuadro.personaje-especial');
           if (personajeEspecialOriginal) {
             personajeEspecialOriginal.style.opacity = '1';
             personajeEspecialOriginal.style.filter = 'none';
             personajeEspecialOriginal.style.mask = 'none';
             personajeEspecialOriginal.style.webkitMask = 'none';
           }
           
           if (progress > 0.8) {
             multitudElement.classList.add('reduced-motion');
           } else {
             multitudElement.classList.remove('reduced-motion');
           }
         }
      }
    });
  } else {
         // Versión completa con máscara y efectos SOLO para la multitud
     gsap.timeline({
       scrollTrigger: {
         trigger: espacioBElement,
         start: "top bottom",
         end: "bottom top",
         scrub: true,
         onUpdate: (self) => {
           const progress = self.progress;
           console.log(`🎭 Progreso cortina: ${(progress * 100).toFixed(1)}%`);
           
           // Asegurar que el personaje especial original NUNCA se vea afectado (ahora en .retrato-fijo)
           const personajeEspecialOriginal = document.querySelector('.retrato-fijo .cuadro.personaje-especial');
           if (personajeEspecialOriginal) {
             personajeEspecialOriginal.style.opacity = '1';
             personajeEspecialOriginal.style.filter = 'none';
             personajeEspecialOriginal.style.mask = 'none';
             personajeEspecialOriginal.style.webkitMask = 'none';
           }
         }
       }
     })
     .to(multitudElement, {
       "--wipe": "100%",
       opacity: 0,
       filter: "blur(6px)",
       ease: "none",
       duration: 1
     });
  }

  console.log(`✅ Animación de cortina configurada (Movimiento reducido: ${prefieereMovimientoReducido})`);
}

// Inicializar la escena de multitud después de que la pirámide esté completa
// Esperamos un poco para asegurar que todo esté cargado
setTimeout(() => {
  inicializarEscenaMultitud();
}, 2000);

// Agregar información de debug para la nueva funcionalidad
setTimeout(() => {
  console.log("🎭 === ESCENA DE PERSONAJE ESPECIAL ===");
  console.log(`📊 Imágenes en multitud: ${document.querySelectorAll('.multitud img').length} (vacía por diseño)`);
  console.log(`🖼️ Personaje especial: ${document.querySelectorAll('.retrato-fijo .cuadro.personaje-especial').length ? 'Aislado en zona protegida (.retrato-fijo)' : 'No encontrado en zona protegida'}`);
  console.log(`🎬 ScrollTriggers activos: ${ScrollTrigger.getAll().length}`);
  console.log(`♿ Movimiento reducido: ${window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'SÍ' : 'NO'}`);
}, 3000);