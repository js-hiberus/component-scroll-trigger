// ===== FUNCIONES UTILITARIAS Y DEBUG =====

/**
 * Función para generar nombre alt a partir del nombre de archivo
 */
function generarAltText(rutaImagen) {
  const nombreArchivo = rutaImagen.split('/').pop().split('.')[0];
  return `Personaje ${nombreArchivo}`;
}

/**
 * Función para verificar si las imágenes existen y pueden cargarse
 */
function verificarImagenes() {
  PERSONAJES.forEach((personaje, index) => {
    const img = new Image();
    const rutaCodificada = encodeURI(personaje.imagen);
    img.onload = () => {
      console.log(`✅ Imagen ${index + 1} cargada`);
    };
    img.onerror = () => {
      console.error(`❌ Error cargando imagen ${index + 1}: ${personaje.imagen}`);
    };
    img.src = rutaCodificada;
  });
}

/**
 * Detectar tipo de dispositivo para logging
 */
function detectarTipoDispositivo() {
  const width = window.innerWidth;
  let dispositivo = 'Desktop';
  if (width <= 480) dispositivo = 'Móvil pequeño';
  else if (width <= 768) dispositivo = 'Móvil';
  else if (width <= 1024) dispositivo = 'Tablet';
  else if (width <= 1200) dispositivo = 'Desktop pequeño';
  
  return { dispositivo, width };
}

/**
 * Función de debug para mostrar información del sistema
 */
function mostrarInformacionSistema() {
  const info = detectarTipoDispositivo();
  console.log(`📱 Dispositivo: ${info.dispositivo} (${info.width}px)`);
  console.log(`🎬 ScrollTriggers: ${ScrollTrigger.getAll().length}`);
  console.log(`🧱 Elementos DOM: ${document.querySelectorAll('.cuadro').length}`);
  console.log(`📈 Visibles: ${STATE.cuadrosVisibles}`);
}

/**
 * Inicializar funciones de debug
 */
function inicializarDebug() {
  if (!CONFIG.enableDebug) return;
  
  // Ejecutar debug automático después de la carga
  setTimeout(() => {
    console.log(`✅ ${PERSONAJES.length} imágenes disponibles`);
    console.log(`🎯 Total configurado: ${CONFIG.total}`);
    console.log(`🎭 Personaje especial: ${personajeEspecial.id}`);
    verificarImagenes();
    
    // Mostrar conteo de elementos visibles después de un momento
    setTimeout(mostrarInformacionSistema, 2000);
  }, 1000);
}

// Exportar para uso global
window.generarAltText = generarAltText;
window.verificarImagenes = verificarImagenes;
window.detectarTipoDispositivo = detectarTipoDispositivo;
window.mostrarInformacionSistema = mostrarInformacionSistema;
window.inicializarDebug = inicializarDebug; 