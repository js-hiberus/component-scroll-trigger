// ===== INICIALIZACIÓN Y CONFIGURACIÓN =====
gsap.registerPlugin(ScrollTrigger);

// Configuración principal
const total = 21; // Total de cartas a mostrar (ajustado al número de imágenes disponibles)
const piramide = document.getElementById("piramide");
const monitor = document.getElementById("monitor");
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let cuadrosVisibles = 0;

// ===== ESTRUCTURA UNIFICADA: PERSONAJES CON IMÁGENES Y BOCADILLOS =====
const personajes = [
  // Personaje principal (índice 0) - Marcos Perez
  {
    imagen: 'PERSONAJES PRESENTACION/a6dead66-a24a-4bc3-ac05-16e287c81cee-1.png',
    nombre: "Marcos Perez",
    edad: "56 años", 
    lugar: "Zargoza",
    bocadilloX: -250, 
    bocadilloY: -40
  },
  // Segunda imagen (índice 1) - Miguel Fernández Castro
  {
    imagen: 'PERSONAJES PRESENTACION/1d61c3b9-d995-4505-8503-d9cd43fee078.png',
    nombre: "Miguel Fernández Castro",
    edad: "18 años", 
    lugar: "Soria",
    bocadilloX: 180,
    bocadilloY: -80
  },
  // Tercera imagen (índice 2) - Manuela Velázquez
  {
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4.png',
    nombre: "Manuela Velázquez",
    edad: "21 años", 
    lugar: "Madrid",
    bocadilloX: 160,
  },
  // Cuarta imagen (índice 3) - Marcos Fernández Castro
  {
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-41.png',
    nombre: "Marcos Fernández Castro",
    edad: "34 años", 
    lugar: "Soria",
    bocadilloX: -220,
    bocadilloY: -60
  },
  // Quinta imagen (índice 4) - Miguel Solís
  {
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-422.png',
    nombre: "Miguel Solís",
    edad: "54 años", 
    lugar: "Madrid",
    bocadilloX: 170,
    bocadilloY: 140
  },
  // Sexta imagen (índice 5) - Federico Saenz Bilaró
  {
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4222.png',
    nombre: "Federico Saenz Bilaró",
    edad: "56 años", 
    lugar: "Vigo",
    bocadilloX: 190,
    bocadilloY: -20
  },
  // Séptima imagen (índice 6) - Luis Perez
  {
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-42222.png',
    nombre: "Luis Perez",
    edad: "16 años", 
    lugar: "Cudillero",
    bocadilloX: -180,
    bocadilloY: 110
  },
  // Octava imagen (índice 7) - Oscar Vilezario
  {
    imagen: 'PERSONAJES PRESENTACION/0263935d-60a4-4588-a8c0-2e5c53f39246.png',
    nombre: "Oscar Vilezario",
    edad: "65 años", 
    lugar: "Lugo",
    bocadilloX: -190,
    bocadilloY: 80
  },
  // Novena imagen (índice 8) - Fernando y Marcos Rodríguez
  {
    imagen: 'PERSONAJES PRESENTACION/05fe8d8a-f40c-466a-9eea-de67882e8462.png',
    nombre: "Fernando y Marcos Rodríguez",
    edad: "36 y 48 años", 
    lugar: "Hondarribia",
    bocadilloX: 200,
    bocadilloY: 100
  },
  // Décima imagen (índice 9) - Pedro Verne
  {
    imagen: 'PERSONAJES PRESENTACION/06758c23-507d-4e2a-b7d1-533a5398cd28.png',
    nombre: "Pedro Verne",
    edad: "43 años", 
    lugar: "Bilbao",
    bocadilloX: -200,
    bocadilloY: -30
  },
  // Undécima imagen (índice 10) - Santiago Velázquez
  {
    imagen: 'PERSONAJES PRESENTACION/10a655fe-2aef-445e-8efd-39463fbab1fe.png',
    nombre: "Santiago Velázquez",
    edad: "19 años", 
    lugar: "Pontevedra",
    bocadilloX: 150,
    bocadilloY: -100
  },
  // Duodécima imagen (índice 11) - Oscar Velizario y Josefa Marquez
  {
    imagen: 'PERSONAJES PRESENTACION/1ac87812-7157-4770-b3df-1c7bcd634660.png',
    nombre: "Oscar Velizario y Josefa Marquez",
    edad: "65 y 61 años", 
    lugar: "Lugo",
    bocadilloX: 210,
    bocadilloY: 70
  },
  // Decimotercera imagen (índice 12) - María, Victor y Dolores Huergo Carmona
  {
    imagen: 'PERSONAJES PRESENTACION/2f22cab5-4c85-46b9-ba3c-a218d7e30d03.png',
    nombre: "María, Victor y Dolores Huergo Carmona",
    edad: "63, 23 y 35 años", 
    lugar: "Aragón",
    bocadilloX: -230,
    bocadilloY: 130
  },
  // Decimocuarta imagen (índice 13) - Pedro, Marcos y Felipa Sanchez Viel
  {
    imagen: 'PERSONAJES PRESENTACION/3647a5f1-7c43-4f49-b93f-fd814c750c2f.png',
    nombre: "Pedro, Marcos y Felipa Sanchez Viel",
    edad: "45, 61 y 51 años", 
    lugar: "Zamora",
    bocadilloX: 180,
    bocadilloY: -110
  },
  // Imágenes adicionales sin información de personaje (por si hay más imágenes)
  {
    imagen: 'PERSONAJES PRESENTACION/3ad98faa-5620-48ae-9d5c-fc57a704d283-1.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/56e4554d-262a-46d1-b055-12f4507b360e.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/5ac2ad31-5805-4845-a673-f4425fe1a528.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/981c1a0e-4572-462e-b816-ceef827c46f3.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/a896d580-11b9-4584-a33a-f3ded7b7469b.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/aabc9875-424e-452f-a2d3-8886ac9a6c6f.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  },
  {
    imagen: 'PERSONAJES PRESENTACION/d5b91333-ec05-45bc-94ee-b71e436502fe.png',
    nombre: null,
    edad: null,
    lugar: null,
    bocadilloX: 0,
    bocadilloY: 0
  }
];

// ===== CONFIGURACIÓN DE LA ESTRUCTURA PIRAMIDAL =====
const piramideConfig = [
  { fila: 1, elementos: 4, offsetY: -200, zIndex: 35 },
  { fila: 2, elementos: 6, offsetY: -280, zIndex: 30 },
  { fila: 3, elementos: 8, offsetY: -360, zIndex: 25 },
  { fila: 4, elementos: 2, offsetY: -440, zIndex: 20 }
];

const posicionesUsadas = [];

// ===== FUNCIONES DE POSICIONAMIENTO =====

/**
 * Determina en qué fila va un elemento específico
 */
function obtenerFilaYPosicion(indice) {
  let elementoActual = indice;
  let filaIndex = 0;
  
  for (let i = 0; i < piramideConfig.length; i++) {
    if (elementoActual < piramideConfig[i].elementos) {
      filaIndex = i;
      break;
    }
    elementoActual -= piramideConfig[i].elementos;
  }
  
  return { fila: filaIndex, posicionEnFila: elementoActual };
}

/**
 * Calcula la posición exacta (x,y) de un elemento
 */
function encontrarPosicion(indice) {
  const { fila, posicionEnFila } = obtenerFilaYPosicion(indice);
  const config = piramideConfig[fila] || piramideConfig[piramideConfig.length - 1];
  
  const elementosEnFila = config.elementos;
  const maxAnchoDisponible = window.innerWidth * 0.98;
  let espacioEntreElementos = Math.min(300, maxAnchoDisponible / (elementosEnFila + 1));
  
  // Ajustar espaciado según la fila - llenar espacios vacíos
  if (fila === 0) {
    // Primera fila: 4 elementos bien distribuidos
    espacioEntreElementos = Math.max(280, espacioEntreElementos);
  } else if (fila === 1) {
    // Segunda fila: 6 elementos ocupando más espacio
    espacioEntreElementos = Math.max(250, espacioEntreElementos);
  } else if (fila === 2) {
    // Tercera fila: 8 elementos llenando los espacios intermedios
    espacioEntreElementos = Math.min(220, Math.max(180, espacioEntreElementos * 0.85));
  } else if (fila === 3) {
    // Cuarta fila: 2 elementos al fondo bien separados
    espacioEntreElementos = Math.max(400, espacioEntreElementos);
  }
  
  // Factor de expansión optimizado para nueva distribución
  const factorExpansion = fila === 3 ? 1.5 : (fila >= 1 ? 1.2 : 1.3);
  const espacioFinal = espacioEntreElementos * factorExpansion;
  const anchoTotalFila = (elementosEnFila - 1) * espacioFinal;
  
  const inicioX = centerX - (anchoTotalFila / 2);
  const left = inicioX + (posicionEnFila * espacioFinal);
  const top = centerY + config.offsetY;
  
  let finalLeft = left;
  
  // Ajustes especiales por fila
  if (fila === 0) {
    // Primera fila: distribución uniforme alrededor del centro
    const separacionExtra = 50;
    if (posicionEnFila <= 1) {
      finalLeft = left - separacionExtra;
    } else {
      finalLeft = left + separacionExtra;
    }
  } else if (fila === 3) {
    // Última fila: elementos muy separados
    const separacionExtra = 200;
    if (posicionEnFila === 0) {
      finalLeft = left - separacionExtra;
    } else {
      finalLeft = left + separacionExtra;
    }
  }
  
  // Variación reducida para mejor alineación
  const variacionX = fila >= 2 ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 6;
  const variacionY = fila >= 2 ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 6;
  
  finalLeft += variacionX;
  const finalTop = top + variacionY;
  
  const leftSeguro = Math.max(120, Math.min(window.innerWidth - 320, finalLeft));
  const topSeguro = Math.max(20, Math.min(window.innerHeight - 500, finalTop)); // Ajustado para imágenes más arriba
  
  posicionesUsadas.push({ 
    left: leftSeguro, 
    top: topSeguro, 
    indice, 
    fila,
    zIndex: config.zIndex 
  });
  
  return { 
    left: leftSeguro, 
    top: topSeguro, 
    fila,
    zIndex: config.zIndex 
  };
}

// ===== CONFIGURACIÓN DE SCROLL SUAVE =====
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== SISTEMA DE BOCADILLOS INTERCAMBIABLES =====

// Array para almacenar todos los bocadillos creados
const bocadillosCreados = [];
let bocadilloActual = null;

/**
 * Crea un bocadillo de información para un personaje específico
 * @param {number} indicePersonaje - Índice del personaje en personajes
 * @returns {HTMLElement} - Elemento DOM del bocadillo
 */
function crearBocadillo(indicePersonaje) {
  const personaje = personajes[indicePersonaje];
  if (!personaje || !personaje.nombre) {
    // Si no hay información del personaje, no crear bocadillo
    return null;
  }
  
  const bocadillo = document.createElement("div");
  bocadillo.classList.add("info-bocadillo");
  bocadillo.id = `bocadillo-${indicePersonaje}`;
  
  // Obtener la posición real de la imagen correspondiente desde el DOM
  let posicionImagen = { left: centerX, top: centerY };
  
  if (indicePersonaje === 0) {
    // Imagen principal - buscar elemento con clase 'head'
    const imagenPrincipal = document.querySelector('.cuadro.head');
    if (imagenPrincipal) {
      const rect = imagenPrincipal.getBoundingClientRect();
      posicionImagen = { 
        left: rect.left + rect.width / 2, 
        top: rect.top + rect.height / 2 
      };
    }
  } else {
    // Buscar la imagen correspondiente en la pirámide
    const todasLasImagenes = document.querySelectorAll('.cuadro:not(.head)');
    const imagenObjetivo = todasLasImagenes[indicePersonaje - 1]; // -1 porque empezamos desde índice 1
    
    if (imagenObjetivo) {
      const rect = imagenObjetivo.getBoundingClientRect();
      posicionImagen = { 
        left: rect.left + rect.width / 2, 
        top: rect.top + rect.height / 2 
      };
    }
  }
  
  // Usar directamente las coordenadas del bocadillo (ya están optimizadas)
  let offsetX = personaje.bocadilloX;
  let offsetY = personaje.bocadilloY;
  
  // Ajustar posición final del bocadillo
  bocadillo.style.left = `${posicionImagen.left + offsetX}px`;
  bocadillo.style.top = `${posicionImagen.top + offsetY}px`;
  bocadillo.style.zIndex = "200";
  
  // Contenido del bocadillo
  bocadillo.innerHTML = `
    <div class="bocadillo-content">
      <strong>${personaje.nombre}</strong><br>
      ${personaje.edad}, ${personaje.lugar}
    </div>
  `;
  
  // Inicialmente invisible
  gsap.set(bocadillo, { opacity: 0, scale: 0.8 });
  
  return bocadillo;
}

/**
 * Muestra un bocadillo específico y oculta el actual
 * @param {number} indicePersonaje - Índice del personaje a mostrar
 */
function mostrarBocadillo(indicePersonaje) {
  // ELIMINAR TODOS los bocadillos existentes del DOM
  document.querySelectorAll('.info-bocadillo').forEach(bocadillo => {
    bocadillo.remove();
  });
  
  // Limpiar arrays
  bocadillosCreados.length = 0;
  bocadilloActual = null;
  
  // Crear SOLO el bocadillo que necesitamos
  const nuevoBocadillo = crearBocadillo(indicePersonaje);
  if (nuevoBocadillo) {
    piramide.appendChild(nuevoBocadillo);
    bocadilloActual = nuevoBocadillo;
    
    // Mostrarlo inmediatamente
    gsap.to(nuevoBocadillo, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }
}

/**
 * Oculta todos los bocadillos
 */
function ocultarTodosBocadillos() {
  // ELIMINAR TODOS los bocadillos del DOM
  document.querySelectorAll('.info-bocadillo').forEach(bocadillo => {
    bocadillo.remove();
  });
  
  // Limpiar variables
  bocadillosCreados.length = 0;
  bocadilloActual = null;
}

/**
 * Crea una carta individual con imagen y animación
 */
function crearCuadro(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");

  // Carta principal (elemento 1)
  if (i === 0) {
    div.classList.add("head");
    
    // Crear estructura HTML para imagen principal - SIN efectos de tarjeta
    div.innerHTML = `
      <img src="${encodeURI(personajes[i].imagen)}" alt="Persona Principal" loading="eager">
    `;
    
    // Configurar el trigger de scroll para mostrar el primer bocadillo
    gsap.set(div, { opacity: 0 }); // Inicialmente invisible
    
    ScrollTrigger.create({
      trigger: ".scroll-zone",
      start: "top top",
      end: "top+=100 top",
      onEnter: () => {
        // Aparición instantánea de golpe del personaje principal
        gsap.set(div, { opacity: 1 });
        // Mostrar bocadillo del primer personaje
        setTimeout(() => mostrarBocadillo(0), 200);
      },
      onLeaveBack: () => {
        // Desaparición instantánea de golpe
        gsap.set(div, { opacity: 0 });
        // Ocultar todos los bocadillos al hacer scroll hacia atrás
        ocultarTodosBocadillos();
      }
    });
    
    piramide.appendChild(div);
    return;
  }

  // Cartas de la pirámide (elementos 2-50)
  const { left, top, fila, zIndex } = encontrarPosicion(i - 1);
  const escala = Math.max(0.65, 1 - fila * 0.06);
  const opacidad = Math.max(0.7, 1 - fila * 0.05);

  // Aplicar posición y z-index
  div.style.left = `${left}px`;
  div.style.top = `${top}px`;
  div.style.zIndex = zIndex;
  
  // Crear estructura HTML SOLO con imagen - SIN overlay ni efectos de tarjeta
  div.innerHTML = `
    <img src="${encodeURI(personajes[i].imagen || personajes[0].imagen)}" 
         alt="Persona ${i + 1}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
         onerror="console.log('Error cargando imagen ${i + 1}'); this.style.display='none'; this.parentElement.style.background='rgba(255,255,255,0.1)'; this.parentElement.innerHTML='<span style=\\'color:white; font-size:12px; text-align:center; display:flex; align-items:center; justify-content:center; height:100%\\'>Imagen ${i + 1}</span>';">
  `;

  // ===== EVENTO DE CLIC ELIMINADO =====
  // Modal de debug eliminado para mejor experiencia de usuario

  // ===== CONFIGURACIÓN DE ANIMACIÓN =====
  gsap.set(div, { opacity: 0 }); // Solo opacidad, sin escala

  // Aumentar el tiempo entre apariciones para efecto más dramático
  const delayGrupo = i < 4 ? i * 300 : i < 15 ? 1200 + (i - 4) * 200 : 3400 + (i - 15) * 150;

  ScrollTrigger.create({
    trigger: ".scroll-zone",
    start: `top+=${delayGrupo} top`,
    end: `top+=${delayGrupo + 50} top`,
    onEnter: () => {
      div.classList.add("mostrar");
      cuadrosVisibles++;
      
      // Aparición instantánea de golpe
      gsap.set(div, { 
        opacity: opacidad,
        scale: escala
      });
      
      // Sistema de bocadillos intercambiables - UNO A LA VEZ
      if (i >= 1 && i <= 13) {
        mostrarBocadillo(i);
      }
    },
    onLeaveBack: () => {
      div.classList.remove("mostrar");
      cuadrosVisibles--;
      
      // Desaparición instantánea de golpe
      gsap.set(div, { opacity: 0 });
      
      // Al hacer scroll hacia atrás, mostrar el bocadillo anterior
      if (i >= 1 && i <= 13) {
        // Si salimos de una imagen, mostrar el bocadillo del personaje anterior
        const personajeAnterior = Math.max(0, i - 1);
        mostrarBocadillo(personajeAnterior);
      }
    }
  });

  piramide.appendChild(div);
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
    piramideConfig.forEach((config, index) => {
      console.log(`   Fila ${index + 1}: ${config.elementos} elementos`);
    });
    console.log(`📍 Total posiciones: ${posicionesUsadas.length}`);
  }
}
requestIdleCallback(crearCuadrosProgresivamente);

// ===== MONITOREO DE RENDIMIENTO =====
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;

setInterval(() => {
  if (performance.memory) {
    const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
    monitor.innerHTML = `🧱 Cuadros visibles: ${cuadrosVisibles}<br>🧠 Memoria: ${usedMB} MB<br>🚀 FPS: ${fps}<br>🏗️ Filas piramidales: ${piramideConfig.length}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
  } else {
    monitor.innerHTML = `🧱 Cuadros visibles: ${cuadrosVisibles}<br>🧠 Memoria: N/D<br>🚀 FPS: ${fps}<br>🏗️ Filas piramidales: ${piramideConfig.length}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
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
  
  let elementoActual = 1;
  
  piramideConfig.forEach((config, filaIndex) => {
    const elementos = [];
    for (let i = 0; i < config.elementos; i++) {
      elementos.push(elementoActual + i);
    }
    console.log(`Fila ${filaIndex + 1}: [${elementos.join(', ')}] (${config.elementos} elementos)`);
    elementoActual += config.elementos;
  });
  
  console.log("=" .repeat(50));
  console.log(`Total elementos (sin contar head): ${elementoActual - 1}`);
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
  console.log(`📊 Distribución: 1 principal + ${total-1} en pirámide = ${total} total`);
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