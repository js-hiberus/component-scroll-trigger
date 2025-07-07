// ===== GESTIÓN DE POSICIONAMIENTO Y DISPOSICIÓN =====

// Configuración de disposición exacta según imagen
const DISPOSICION_MANUAL = [
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
  // Cuarta fila ampliada (8 personajes) - incluye índices 13-20
  { fila: 4, posicion: 0, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 1, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 2, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 3, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 4, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 5, escala: 0.6, offsetY: -150, zIndex: 60 },
  // Personaje-20 (índice 19)
  { fila: 4, posicion: 6, escala: 0.6, offsetY: -150, zIndex: 60 },
  // Personaje-21 (índice 20) - configuración normal cuando no es especial
  { fila: 4, posicion: 7, escala: 0.6, offsetY: -150, zIndex: 60 }
];

/**
 * Encuentra la posición para un personaje en la pirámide
 */
function encontrarPosicion(indice) {
  // Si hay una disposición manual definida para este índice, usarla
  const manual = DISPOSICION_MANUAL[indice];
  
  // NOTA: El personaje especial seleccionado NO debe usar esta función
  // Su posición se maneja directamente en crearCuadro() con coordenadas fijas
  
  // Para el resto de personajes (0-20), usar la lógica original
  const totalFilas = [1, 2, 5, 5, 8]; // Última fila ampliada para incluir personajes 19, 20
  let fila = 0;
  let posEnFila = indice;
  for (let f = 0; f < totalFilas.length; f++) {
    if (posEnFila < totalFilas[f]) {
      fila = f;
      break;
    }
    posEnFila -= totalFilas[f];
  }
  
  const escala = manual ? manual.escala : 0.5;
  const zIndex = manual ? manual.zIndex : 50;
  
  // AJUSTE PARA ÁREA EXPANDIDA Y MÁS ALTA
  // Área expandida horizontalmente y subida verticalmente
  const rectanguloAncho = window.innerWidth * 0.5;
  const rectanguloAlto = window.innerHeight * 0.25;
  
  // Centro ajustado por dispositivo
  const esMobile = window.innerWidth <= 768;
  const centroX = esMobile ? window.innerWidth * 0.32 : window.innerWidth * 0.40;
  
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

/**
 * Actualiza las posiciones de todos los elementos al redimensionar
 */
function actualizarPosicionesElementos() {
  // Recalcular centro en caso de rotación
  STATE.centerX = window.innerWidth / 2;
  STATE.centerY = window.innerHeight / 2;
  
  // Reposicionar todos los cuadros con las nuevas dimensiones
  const cuadros = document.querySelectorAll('.cuadro:not(.personaje-especial)');
  cuadros.forEach((cuadro, index) => {
    if (index !== indicePersonajeEspecial) { // Excluir personaje especial
      const { left, top } = encontrarPosicion(index);
      cuadro.style.left = `${left}px`;
      cuadro.style.top = `${top}px`;
    }
  });
  
  // Reposicionar personaje especial
  const personajeEspecialElement = document.querySelector('.cuadro.personaje-especial');
  if (personajeEspecialElement) {
    const esMobilePersonaje = window.innerWidth <= 768;
    if (esMobilePersonaje) {
      // En móvil: completamente centrado en la pantalla
      personajeEspecialElement.style.left = `${(window.innerWidth - 240) / 2}px`;
      personajeEspecialElement.style.top = `${(window.innerHeight - 360) / 2 - 60}px`;
      personajeEspecialElement.style.width = "240px";
      personajeEspecialElement.style.height = "360px";
      personajeEspecialElement.style.transform = `scale(2.2)`;
    } else {
      // En PC: posición fija más a la derecha y más pequeño
      personajeEspecialElement.style.left = "1100px";
      personajeEspecialElement.style.top = `${(window.innerHeight - 1200) / 2}px`;
      personajeEspecialElement.style.width = "320px";
      personajeEspecialElement.style.height = "1200px";
      personajeEspecialElement.style.transform = "none";
    }
  }
}

// Exportar para uso global
window.DISPOSICION_MANUAL = DISPOSICION_MANUAL;
window.encontrarPosicion = encontrarPosicion;
window.actualizarPosicionesElementos = actualizarPosicionesElementos; 