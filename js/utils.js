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
  console.log("🔍 Verificando carga de imágenes...");
  
  PERSONAJES.forEach((personaje, index) => {
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

/**
 * Función para mostrar la estructura completa de la pirámide en consola
 */
function mostrarEstructuraPiramide() {
  console.log("🏗️ ESTRUCTURA DE LA PIRÁMIDE:");
  console.log("=" .repeat(50));
  
  DISPOSICION_MANUAL.forEach((config, filaIndex) => {
    const elementos = [];
    for (let i = 0; i < config.elementos; i++) {
      elementos.push(i + 1);
    }
    console.log(`Fila ${filaIndex + 1}: [${elementos.join(', ')}] (${config.elementos} elementos)`);
  });
  
  console.log("=" .repeat(50));
  console.log(`Total elementos (sin contar head): ${DISPOSICION_MANUAL.length}`);
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
  console.log(`🎬 ScrollTriggers activos: ${ScrollTrigger.getAll().length}`);
  console.log(`🧱 Elementos en DOM: ${document.querySelectorAll('.cuadro').length}`);
  console.log(`📈 Elementos visibles: ${STATE.cuadrosVisibles}`);
}

/**
 * Función para debug completo del sistema
 */
function debugCompleto() {
  console.log("🔧 === DEBUG COMPLETO DEL SISTEMA ===");
  mostrarEstructuraPiramide();
  mostrarPersonajeEspecial();
  mostrarInformacionSistema();
  console.log("=" .repeat(50));
}

/**
 * Inicializar funciones de debug
 */
function inicializarDebug() {
  if (!CONFIG.enableDebug) return;
  
  // Ejecutar debug automático después de la carga
  setTimeout(() => {
    mostrarEstructuraPiramide();
    console.log("✅ Usando imágenes de la carpeta PERSONAJES PRESENTACION");
    console.log(`📁 ${PERSONAJES.length} imágenes disponibles`);
    console.log(`🎯 Total elementos configurados: ${CONFIG.total}`);
    console.log(`📊 Distribución: Todos en pirámide = ${CONFIG.total} total`);
    console.log(`🎭 Personaje especial seleccionado: ${personajeEspecial.id} (índice: ${indicePersonajeEspecial})`);
    console.log("💡 Para cambiar una imagen específica, ejecuta: cambiarImagen(numero, 'ruta-imagen.jpg')");
    console.log("🎭 Para ver info del personaje especial: mostrarPersonajeEspecial()");
    console.log("🔄 Para cambiar personaje especial: cambiarPersonajeEspecial(indice)");
    console.log("🔧 Para debug completo: debugCompleto()");
    
    // Verificar que las imágenes se puedan cargar
    verificarImagenes();
    
    // Mostrar conteo de elementos visibles después de un momento
    setTimeout(() => {
      mostrarInformacionSistema();
    }, 2000);
  }, 1000);
}

// Exportar para uso global
window.generarAltText = generarAltText;
window.verificarImagenes = verificarImagenes;
window.mostrarEstructuraPiramide = mostrarEstructuraPiramide;
window.detectarTipoDispositivo = detectarTipoDispositivo;
window.mostrarInformacionSistema = mostrarInformacionSistema;
window.debugCompleto = debugCompleto;
window.inicializarDebug = inicializarDebug; 