const DISPOSICION_MANUAL = [
  // Fila 0: 1 elemento (índice 0)
  { fila: 0, posicion: 0, escala: 1.0, offsetY: 80, zIndex: 100 },
  
  // Fila 1: 2 elementos (índices 1-2)
  { fila: 1, posicion: 0, escala: 0.92, offsetY: 30, zIndex: 90 },
  { fila: 1, posicion: 1, escala: 0.92, offsetY: 30, zIndex: 90 },
  
  // Fila 2: 5 elementos (índices 3-7)
  { fila: 2, posicion: 0, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 1, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 2, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 3, escala: 0.82, offsetY: -30, zIndex: 80 },
  { fila: 2, posicion: 4, escala: 0.82, offsetY: -30, zIndex: 80 },
  
  // Fila 3: 5 elementos (índices 8-12)
  { fila: 3, posicion: 0, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 1, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 2, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 3, escala: 0.7, offsetY: -90, zIndex: 70 },
  { fila: 3, posicion: 4, escala: 0.7, offsetY: -90, zIndex: 70 },
  
  // Fila 4: 8 elementos (índices 13-20)
  { fila: 4, posicion: 0, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 1, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 2, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 3, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 4, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 5, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 6, escala: 0.6, offsetY: -150, zIndex: 60 },
  { fila: 4, posicion: 7, escala: 0.6, offsetY: -150, zIndex: 60 }
];

const DISPOSICION_MULTITUD_MOVIL = [
  { fila: 0, posicion: 0, escala: 0.45, offsetY: -200, zIndex: 10 },
  { fila: 0, posicion: 1, escala: 0.45, offsetY: -200, zIndex: 10 },
  { fila: 0, posicion: 2, escala: 0.45, offsetY: -200, zIndex: 10 },
  { fila: 0, posicion: 3, escala: 0.45, offsetY: -200, zIndex: 10 },
  { fila: 0, posicion: 4, escala: 0.45, offsetY: -200, zIndex: 10 },
  { fila: 1, posicion: 0, escala: 0.5, offsetY: -120, zIndex: 20 },
  { fila: 1, posicion: 1, escala: 0.5, offsetY: -120, zIndex: 20 },
  { fila: 1, posicion: 2, escala: 0.5, offsetY: -120, zIndex: 20 },
  { fila: 1, posicion: 3, escala: 0.5, offsetY: -120, zIndex: 20 },
  { fila: 1, posicion: 4, escala: 0.5, offsetY: -120, zIndex: 20 },
  { fila: 2, posicion: 0, escala: 0.55, offsetY: -40, zIndex: 30 },
  { fila: 2, posicion: 1, escala: 0.55, offsetY: -40, zIndex: 30 },
  { fila: 2, posicion: 2, escala: 0.55, offsetY: -40, zIndex: 30 },
  { fila: 2, posicion: 3, escala: 0.55, offsetY: -40, zIndex: 30 },
  { fila: 2, posicion: 4, escala: 0.55, offsetY: -40, zIndex: 30 },
  { fila: 3, posicion: 0, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 1, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 2, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 3, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 4, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 5, escala: 0.6, offsetY: 40, zIndex: 40 },
  { fila: 3, posicion: 6, escala: 0.6, offsetY: 40, zIndex: 40 }
];

function encontrarPosicion(indice) {
  const esMobile = window.innerWidth <= 768;
  
  if (esMobile) {
    return encontrarPosicionMovilMultitud(indice);
  }
  
  // Usar la configuración manual si existe para este índice
  const manual = DISPOSICION_MANUAL[indice];
  if (!manual) {
    // Fallback si no hay configuración manual
    console.warn(`No hay configuración manual para índice ${indice}`);
    return { left: 0, top: 0, fila: 0, zIndex: 50, escala: 0.5 };
  }
  
  const { fila, posicion, escala, zIndex } = manual;
  const totalFilas = [1, 2, 5, 5, 8];
  
  const rectanguloAncho = window.innerWidth * 0.5;
  const centroX = window.innerWidth * 0.40;
  const personajesEnFila = totalFilas[fila];
  const espacioHorizontal = rectanguloAncho / Math.max(personajesEnFila, 1);
  const inicioX = centroX - (rectanguloAncho / 2);
  const left = inicioX + (posicion + 0.5) * espacioHorizontal;
  
  const inicioY = window.innerHeight * 0.02;
  const espacioVertical = (window.innerHeight * 0.45) / 5;
  const filaInvertida = 4 - fila;
  const top = inicioY + filaInvertida * espacioVertical;
  
  return { left, top, fila, zIndex, escala };
}

function encontrarPosicionMovilMultitud(indice) {
  if (indice === indicePersonajeEspecial) {
    return { left: 0, top: 0, fila: 0, zIndex: 8000, escala: 1 };
  }
  
  const config = DISPOSICION_MULTITUD_MOVIL[indice];
  if (!config) {
    return { left: 0, top: 0, fila: 0, zIndex: 10, escala: 0.5 };
  }
  
  const { fila, posicion, escala, offsetY, zIndex } = config;
  
  const areaMultitud = {
    ancho: window.innerWidth * 0.8,
    alto: window.innerHeight * 0.6,
    centroX: window.innerWidth * 0.5,
    centroY: window.innerHeight * 0.4
  };
  
  const personajesPorFila = [5, 5, 5, 7];
  const totalEnFila = personajesPorFila[fila];
  const espacioHorizontal = areaMultitud.ancho / Math.max(totalEnFila, 1);
  const inicioX = areaMultitud.centroX - (areaMultitud.ancho / 2);
  const left = inicioX + (posicion + 0.5) * espacioHorizontal;
  
  const espacioVertical = areaMultitud.alto / 4;
  const top = areaMultitud.centroY - (areaMultitud.alto / 2) + (fila * espacioVertical) + offsetY;
  
  return { left, top, fila, zIndex, escala };
}

function actualizarPosicionesElementos() {
  STATE.centerX = window.innerWidth / 2;
  STATE.centerY = window.innerHeight / 2;
  
  const cuadros = document.querySelectorAll('.cuadro:not(.personaje-especial)');
  cuadros.forEach((cuadro, index) => {
    if (index !== indicePersonajeEspecial) {
      const { left, top, escala } = encontrarPosicion(index);
      cuadro.style.left = `${left}px`;
      cuadro.style.top = `${top}px`;
      
      if (window.innerWidth <= 768) {
        cuadro.style.transform = `scale(${escala})`;
      } else {
        cuadro.style.transform = "none";
      }
    }
  });
  
  const personajeEspecialElement = document.querySelector('.cuadro.personaje-especial');
  if (personajeEspecialElement) {
    const esMobile = window.innerWidth <= 768;
    if (esMobile) {
      personajeEspecialElement.style.left = `${window.innerWidth * 0.5 - 140}px`;
      personajeEspecialElement.style.top = `${window.innerHeight * 0.55}px`;
      personajeEspecialElement.style.width = "280px";
      personajeEspecialElement.style.height = "420px";
      personajeEspecialElement.style.transform = `scale(1.3)`;
    } else {
      personajeEspecialElement.style.left = "1100px";
      personajeEspecialElement.style.top = `${(window.innerHeight - 1200) / 2}px`;
      personajeEspecialElement.style.width = "320px";
      personajeEspecialElement.style.height = "1200px";
      personajeEspecialElement.style.transform = "none";
    }
  }
}

window.DISPOSICION_MANUAL = DISPOSICION_MANUAL;
window.DISPOSICION_MULTITUD_MOVIL = DISPOSICION_MULTITUD_MOVIL;
window.encontrarPosicion = encontrarPosicion;
window.encontrarPosicionMovilMultitud = encontrarPosicionMovilMultitud;
window.actualizarPosicionesElementos = actualizarPosicionesElementos; 