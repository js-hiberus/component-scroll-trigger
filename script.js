// ===== INICIALIZACIÓN Y CONFIGURACIÓN =====
gsap.registerPlugin(ScrollTrigger);

// Configuración principal
const total = 21; // Total de cartas a mostrar (ajustado al número de imágenes disponibles)
const piramide = document.getElementById("piramide");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const monitor = document.getElementById("monitor");
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let cuadrosVisibles = 0;

// ===== MAPEO DE IMÁGENES =====
/**
 * Imágenes locales de la carpeta PERSONAJES PRESENTACION
 * Cada posición corresponde al número de cuadro (0 = cuadro 1, 1 = cuadro 2, etc.)
 */
const imagenesPersonas = [
  'PERSONAJES PRESENTACION/Sin ti╠ütulo-4.png',      // Cuadro 1 (principal)
  'PERSONAJES PRESENTACION/Sin ti╠ütulo-41.png',     // Cuadro 2
  'PERSONAJES PRESENTACION/Sin ti╠ütulo-422.png',    // Cuadro 3
  'PERSONAJES PRESENTACION/Sin ti╠ütulo-4222.png',   // Cuadro 4
  'PERSONAJES PRESENTACION/Sin ti╠ütulo-42222.png',  // Cuadro 5
  'PERSONAJES PRESENTACION/0263935d-60a4-4588-a8c0-2e5c53f39246.png',
  'PERSONAJES PRESENTACION/05fe8d8a-f40c-466a-9eea-de67882e8462.png',
  'PERSONAJES PRESENTACION/06758c23-507d-4e2a-b7d1-533a5398cd28.png',
  'PERSONAJES PRESENTACION/10a655fe-2aef-445e-8efd-39463fbab1fe.png',
  'PERSONAJES PRESENTACION/1ac87812-7157-4770-b3df-1c7bcd634660.png',
  'PERSONAJES PRESENTACION/1d61c3b9-d995-4505-8503-d9cd43fee078.png',
  'PERSONAJES PRESENTACION/2f22cab5-4c85-46b9-ba3c-a218d7e30d03.png',
  'PERSONAJES PRESENTACION/3647a5f1-7c43-4f49-b93f-fd814c750c2f.png',
  'PERSONAJES PRESENTACION/3ad98faa-5620-48ae-9d5c-fc57a704d283-1.png',
  'PERSONAJES PRESENTACION/56e4554d-262a-46d1-b055-12f4507b360e.png',
  'PERSONAJES PRESENTACION/5ac2ad31-5805-4845-a673-f4425fe1a528.png',
  'PERSONAJES PRESENTACION/981c1a0e-4572-462e-b816-ceef827c46f3.png',
  'PERSONAJES PRESENTACION/a6dead66-a24a-4bc3-ac05-16e287c81cee-1.png',
  'PERSONAJES PRESENTACION/a896d580-11b9-4584-a33a-f3ded7b7469b.png',
  'PERSONAJES PRESENTACION/aabc9875-424e-452f-a2d3-8886ac9a6c6f.png',
  'PERSONAJES PRESENTACION/d5b91333-ec05-45bc-94ee-b71e436502fe.png'
];

// ===== CONFIGURACIÓN DE LA ESTRUCTURA PIRAMIDAL =====
const piramideConfig = [
  { fila: 1, elementos: 4, offsetY: -200, zIndex: 35 },  // Fila 1: por encima de la línea roja
  { fila: 2, elementos: 6, offsetY: -280, zIndex: 30 },  // Fila 2: más arriba
  { fila: 3, elementos: 8, offsetY: -360, zIndex: 25 },  // Fila 3: aún más arriba 
  { fila: 4, elementos: 2, offsetY: -440, zIndex: 20 }   // Fila 4: al fondo superior
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
  const maxAnchoDisponible = window.innerWidth * 0.98; // Usar más ancho disponible
  let espacioEntreElementos = Math.min(300, maxAnchoDisponible / (elementosEnFila + 1)); // Ajustado para nueva distribución
  
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

// ===== FUNCIÓN PRINCIPAL DE CREACIÓN DE CARTAS CON IMÁGENES =====

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
      <img src="${encodeURI(imagenesPersonas[i])}" alt="Persona Principal" loading="eager">
    `;
    
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
    <img src="${encodeURI(imagenesPersonas[i] || imagenesPersonas[0])}" 
         alt="Persona ${i + 1}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
         onerror="console.log('Error cargando imagen ${i + 1}'); this.style.display='none'; this.parentElement.style.background='rgba(255,255,255,0.1)'; this.parentElement.innerHTML='<span style=\\'color:white; font-size:12px; text-align:center; display:flex; align-items:center; justify-content:center; height:100%\\'>Imagen ${i + 1}</span>';">
  `;
  
  // Debug visual para elementos específicos - COMENTADO para evitar cuadrados verdes
  /*
  if (i >= 2 && i <= 3) {
    div.classList.add("primera-fila");
    console.log(`🟢 Elemento ${i + 1} (Primera fila) - Fila: ${fila + 1} - Posición: (${left.toFixed(1)}, ${top.toFixed(1)})`);
  }
  */

  // ===== EVENTO DE CLIC =====
  div.addEventListener("click", () => {
    modal.style.display = "block";
    modalContent.innerHTML = `
      <strong>ID:</strong> ${i + 1}<br>
      <strong>Fila:</strong> ${fila + 1}<br>
      <strong>Posición en fila:</strong> ${obtenerFilaYPosicion(i - 1).posicionEnFila + 1}<br>
      <strong>Coordenadas:</strong> (${left.toFixed(0)}, ${top.toFixed(0)})<br>
      <strong>Escala:</strong> ${escala.toFixed(2)}<br>
      <strong>Z-Index:</strong> ${zIndex}<br>
      <strong>Distancia del centro:</strong> ${Math.hypot(left - centerX, top - centerY).toFixed(0)}px
    `;
  });

  // ===== CONFIGURACIÓN DE ANIMACIÓN =====
  gsap.set(div, { opacity: 0, scale: 0.5 });

  const delayGrupo = i < 4 ? i * 100 : i < 15 ? 500 + (i - 4) * 30 : 1000 + (i - 15) * 10;

  gsap.to(div, {
    scrollTrigger: {
      trigger: ".scroll-zone",
      start: `top+=${delayGrupo} top`,
      end: `top+=${delayGrupo + 100} top`,
      scrub: true,
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        div.classList.add("mostrar");
        cuadrosVisibles++;
      },
      onLeaveBack: () => {
        div.classList.remove("mostrar");
        cuadrosVisibles--;
      }
    },
    opacity: opacidad,
    scale: escala,
    duration: 0.5,
    ease: "power2.out"
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
  imagenesPersonas[numeroElemento - 1] = nuevaURL;
  
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
  console.log(`📁 ${imagenesPersonas.length} imágenes disponibles`);
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
  
  imagenesPersonas.forEach((ruta, index) => {
    const img = new Image();
    const rutaCodificada = encodeURI(ruta);
    img.onload = () => {
      console.log(`✅ Imagen ${index + 1} cargada: ${ruta}`);
    };
    img.onerror = () => {
      console.error(`❌ Error cargando imagen ${index + 1}: ${ruta}`);
      console.error(`   Ruta codificada: ${rutaCodificada}`);
    };
    img.src = rutaCodificada;
  });
}