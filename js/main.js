// ===== ARCHIVO PRINCIPAL - INICIALIZACIÓN Y COORDINACIÓN =====

/**
 * Función principal de inicialización
 */
function inicializarAplicacion() {
  console.log("🚀 === INICIANDO APLICACIÓN SCROLL CINEMÁTICO ===");
  
  // Verificar que todos los elementos DOM necesarios estén disponibles
  if (!verificarElementosDOM()) {
    console.error("❌ Error: Elementos DOM requeridos no encontrados");
    return;
  }
  
  // Inicializar módulos en orden específico
  inicializarModulos();
  
  // Configurar eventos del sistema
  configurarEventosSistema();
  
  console.log("✅ Aplicación inicializada correctamente");
  console.log("=" .repeat(50));
}

/**
 * Verificar que todos los elementos DOM necesarios estén disponibles
 */
function verificarElementosDOM() {
  const elementosRequeridos = [
    { elemento: ELEMENTS.piramide, nombre: 'piramide' },
    { elemento: ELEMENTS.monitor, nombre: 'monitor' },
    { elemento: ELEMENTS.scrollZone, nombre: 'scroll-zone' }
  ];
  
  let todosDisponibles = true;
  
  elementosRequeridos.forEach(({ elemento, nombre }) => {
    if (!elemento) {
      console.error(`❌ Elemento DOM requerido no encontrado: ${nombre}`);
      todosDisponibles = false;
    } else {
      console.log(`✅ Elemento DOM encontrado: ${nombre}`);
    }
  });
  
  return todosDisponibles;
}

/**
 * Inicializar todos los módulos en el orden correcto
 */
function inicializarModulos() {
  console.log("🔧 Inicializando módulos...");
  
  // 1. Inicializar monitoreo de rendimiento
  inicializarMonitoreoRendimiento();
  
  // 2. Inicializar debug (si está habilitado)
  inicializarDebug();
  
  // 3. Configurar manejo de redimensionamiento
  manejarRedimensionamiento();
  
  // 4. Inicializar escena de multitud después de un delay
  setTimeout(() => {
    inicializarEscenaMultitud();
  }, 2000);
  
  // 5. Activar efecto cortina del mapa después de un delay
  setTimeout(() => {
    activarEfectoCortinaMapa();
  }, 2500);
  
  console.log("✅ Todos los módulos inicializados");
}

/**
 * Configurar eventos del sistema
 */
function configurarEventosSistema() {
  console.log("🎛️ Configurando eventos del sistema...");
  
  // Evento de carga completa de la página
  document.addEventListener('DOMContentLoaded', () => {
    console.log("📄 DOM completamente cargado");
  });
  
  // Evento de carga completa de recursos
  window.addEventListener('load', () => {
    console.log("🖼️ Todos los recursos cargados");
    
    // Mostrar información del sistema después de la carga completa
    setTimeout(() => {
      mostrarInformacionSistema();
    }, 1000);
  });
  
  // Evento de error global
  window.addEventListener('error', (event) => {
    console.error(`❌ Error global capturado: ${event.message}`);
    console.error(`   Archivo: ${event.filename}`);
    console.error(`   Línea: ${event.lineno}`);
  });
  
  // Evento de salida de la página
  window.addEventListener('beforeunload', () => {
    console.log("👋 Cerrando aplicación...");
  });
  
  console.log("✅ Eventos del sistema configurados");
}

/**
 * Función para mostrar estadísticas de la aplicación
 */
function mostrarEstadisticas() {
  console.log("📊 === ESTADÍSTICAS DE LA APLICACIÓN ===");
  console.log(`🎭 Personaje especial: ${personajeEspecial.id}`);
  console.log(`🧱 Elementos visibles: ${STATE.cuadrosVisibles}`);
  console.log(`🎬 ScrollTriggers activos: ${ScrollTrigger.getAll().length}`);
  console.log(`🖼️ Imágenes totales: ${PERSONAJES.length}`);
  console.log(`⚙️ Configuración total: ${CONFIG.total}`);
  console.log("=" .repeat(50));
}

/**
 * Función para activar el efecto cortina del mapa
 */
function activarEfectoCortinaMapa() {
  console.log("🗺️ Activando efecto cortina del mapa...");
  
  const mapaSvg = document.querySelector('.mapa-svg');
  if (mapaSvg) {
    // Establecer estado inicial según dispositivo
    if (window.innerWidth > 1024) {
      // Desktop: mapa siempre visible
      mapaSvg.classList.add('visible');
      console.log("✅ Efecto cortina del mapa activado para Desktop");
    } else {
      // Mobile: mapa inicialmente oculto, controlado por ScrollTrigger
      mapaSvg.classList.remove('visible');
      console.log("✅ Efecto cortina del mapa configurado para Mobile (controlado por ScrollTrigger)");
    }
  } else {
    console.warn("⚠️ No se encontró el elemento .mapa-svg");
  }
}

/**
 * Función de reinicio de la aplicación
 */
function reiniciarAplicacion() {
  console.log("🔄 Reiniciando aplicación...");
  
  // Limpiar ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // Limpiar elementos del DOM
  const cuadros = document.querySelectorAll('.cuadro');
  cuadros.forEach(cuadro => cuadro.remove());
  
  // Reinicializar variables
  STATE.cuadrosVisibles = 0;
  STATE.personajeEspecialCreado = false;
  
  // Reinicializar personaje especial
  inicializarPersonajeEspecial();
  
  // Reinicializar aplicación
  setTimeout(() => {
    inicializarAplicacion();
  }, 500);
  
  console.log("✅ Aplicación reiniciada");
}

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarAplicacion);
} else {
  // El DOM ya está cargado
  inicializarAplicacion();
}

// Exportar funciones principales para uso global
window.inicializarAplicacion = inicializarAplicacion;
window.mostrarEstadisticas = mostrarEstadisticas;
window.reiniciarAplicacion = reiniciarAplicacion;
window.activarEfectoCortinaMapa = activarEfectoCortinaMapa; 