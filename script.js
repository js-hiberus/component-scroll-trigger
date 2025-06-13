// ===== INICIALIZACIÓN Y CONFIGURACIÓN =====
gsap.registerPlugin(ScrollTrigger);

// Configuración principal
const total = 50; // Total de cartas a mostrar
const piramide = document.getElementById("piramide");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const monitor = document.getElementById("monitor");
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let cuadrosVisibles = 0;

// ===== CONFIGURACIÓN DE LA ESTRUCTURA PIRAMIDAL =====
/**
 * Define cómo se organizan las cartas en filas:
 * - fila: número de fila (para referencia)
 * - elementos: cuántas cartas van en esta fila
 * - offsetY: distancia vertical desde el centro (negativo = hacia arriba)
 * - zIndex: profundidad visual (mayor = más al frente)
 */
const piramideConfig = [
  { fila: 1, elementos: 2, offsetY: -60, zIndex: 45 },   // Fila 1: elementos 2,3
  { fila: 2, elementos: 4, offsetY: -140, zIndex: 40 },  // Fila 2: elementos 4,5,6,7
  { fila: 3, elementos: 6, offsetY: -220, zIndex: 35 },  // Fila 3: elementos 8-13
  { fila: 4, elementos: 8, offsetY: -300, zIndex: 30 },  // Fila 4: elementos 14-21
  { fila: 5, elementos: 10, offsetY: -380, zIndex: 25 }, // Fila 5: elementos 22-31
  { fila: 6, elementos: 12, offsetY: -460, zIndex: 20 }, // Fila 6: elementos 32-43
  { fila: 7, elementos: 7, offsetY: -540, zIndex: 15 }   // Fila 7: elementos 44-50
];

const posicionesUsadas = []; // Array para controlar posiciones ocupadas

// ===== FUNCIONES DE POSICIONAMIENTO =====

/**
 * Determina en qué fila va un elemento específico
 * @param {number} indice - Índice del elemento (0-48, sin contar el elemento principal)
 * @returns {object} - {fila: número de fila, posicionEnFila: posición dentro de esa fila}
 */
function obtenerFilaYPosicion(indice) {
  let elementoActual = indice;
  let filaIndex = 0;
  
  // Buscar en qué fila encaja este elemento
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
 * @param {number} indice - Índice del elemento
 * @returns {object} - {left, top, fila, zIndex}
 */
function encontrarPosicion(indice) {
  const { fila, posicionEnFila } = obtenerFilaYPosicion(indice);
  const config = piramideConfig[fila] || piramideConfig[piramideConfig.length - 1];
  
  // Calcular espaciado horizontal
  const elementosEnFila = config.elementos;
  const maxAnchoDisponible = window.innerWidth * 0.95;
  let espacioEntreElementos = Math.min(180, maxAnchoDisponible / (elementosEnFila + 1));
  
  // Espaciado especial para la primera fila (elementos 2 y 3)
  if (fila === 0) {
    espacioEntreElementos = Math.max(200, espacioEntreElementos);
  }
  
  // Factor de expansión para filas grandes
  const factorExpansion = elementosEnFila > 8 ? 1.3 : 1.1;
  const espacioFinal = espacioEntreElementos * factorExpansion;
  
  const anchoTotalFila = (elementosEnFila - 1) * espacioFinal;
  
  // Posición X centrada
  const inicioX = centerX - (anchoTotalFila / 2);
  const left = inicioX + (posicionEnFila * espacioFinal);
  
  // Posición Y según configuración de fila
  const top = centerY + config.offsetY;
  
  // Separación lateral adicional para primera fila
  let finalLeft = left;
  if (fila === 0) {
    const separacionExtra = 80;
    if (posicionEnFila === 0) {
      finalLeft = left - separacionExtra; // Elemento 2 más a la izquierda
    } else {
      finalLeft = left + separacionExtra; // Elemento 3 más a la derecha
    }
  }
  
  // Pequeña variación aleatoria para naturalidad
  const variacionX = (Math.random() - 0.5) * 5;
  const variacionY = (Math.random() - 0.5) * 5;
  
  finalLeft += variacionX;
  const finalTop = top + variacionY;
  
  // Verificar límites de pantalla
  const leftSeguro = Math.max(60, Math.min(window.innerWidth - 160, finalLeft));
  const topSeguro = Math.max(30, Math.min(window.innerHeight - 200, finalTop));
  
  // Guardar posición
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

// ===== FUNCIÓN PRINCIPAL DE CREACIÓN DE CARTAS =====

/**
 * Crea una carta individual con su posición y animación
 * @param {number} i - Índice de la carta (0 = carta principal)
 */
function crearCuadro(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  div.textContent = i + 1;

  // Carta principal (elemento 1)
  if (i === 0) {
    div.classList.add("head");
    piramide.appendChild(div);
    return;
  }

  // Cartas de la pirámide (elementos 2-50)
  const { left, top, fila, zIndex } = encontrarPosicion(i - 1);
  const escala = Math.max(0.65, 1 - fila * 0.06); // Escala decreciente con la distancia
  const opacidad = Math.max(0.7, 1 - fila * 0.05); // Opacidad decreciente con la distancia

  // Aplicar posición y z-index
  div.style.left = `${left}px`;
  div.style.top = `${top}px`;
  div.style.zIndex = zIndex;
  
  // Debug visual para elementos específicos
  if (i >= 2 && i <= 3) {
    div.classList.add("primera-fila");
    console.log(`🟢 Elemento ${i + 1} (Primera fila) - Fila: ${fila + 1} - Posición: (${left.toFixed(1)}, ${top.toFixed(1)})`);
  } else if (i >= 4 && i <= 7) {
    console.log(`Elemento ${i + 1} - Fila: ${fila + 1} - Posición: (${left.toFixed(1)}, ${top.toFixed(1)})`);
  }

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

  // Timing de aparición basado en la posición del elemento
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
 * Uso: Abrir consola del navegador y escribir: mostrarEstructuraPiramide()
 */
window.mostrarEstructuraPiramide = () => {
  console.log("🏗️ ESTRUCTURA DE LA PIRÁMIDE:");
  console.log("=" .repeat(50));
  
  let elementoActual = 1; // Empezamos desde el elemento 1 (después del head)
  
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

// Ejecutar automáticamente para debug
setTimeout(() => {
  window.mostrarEstructuraPiramide();
}, 1000);