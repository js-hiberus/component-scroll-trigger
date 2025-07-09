function inicializarAplicacion() {
  if (!verificarElementosDOM()) {
    console.error('❌ Elementos DOM requeridos no encontrados');
    return;
  }
  
  inicializarModulos();
  configurarEventosSistema();
  
  console.log('✅ Aplicación inicializada');
}

function verificarElementosDOM() {
  const elementosRequeridos = [
    { elemento: ELEMENTS.piramide, nombre: 'piramide' },
    { elemento: ELEMENTS.monitor, nombre: 'monitor' },
    { elemento: ELEMENTS.scrollZone, nombre: 'scroll-zone' }
  ];
  
  return elementosRequeridos.every(({ elemento, nombre }) => {
    if (!elemento) {
      console.error(`❌ Elemento no encontrado: ${nombre}`);
      return false;
    }
    return true;
  });
}

function inicializarModulos() {
  inicializarMonitoreoRendimiento();
  inicializarDebug();
  manejarRedimensionamiento();
  
  requestIdleCallback(crearCuadrosProgresivamente);
  
  setTimeout(inicializarEscenaMultitud, 2000);
  setTimeout(activarEfectoCortinaMapa, 2500);
}

function configurarEventosSistema() {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM cargado');
  });
  
  window.addEventListener('load', () => {
    console.log('🖼️ Recursos cargados');
    setTimeout(mostrarInformacionSistema, 1000);
  });
  
  window.addEventListener('error', (event) => {
    console.error(`❌ Error: ${event.message} (${event.filename}:${event.lineno})`);
  });
  
  window.addEventListener('beforeunload', () => {
    console.log('👋 Cerrando aplicación');
  });
}

function mostrarEstadisticas() {
  console.log('📊 === ESTADÍSTICAS ===');
  console.log(`🎭 Personaje especial: ${personajeEspecial.id}`);
  console.log(`🧱 Elementos visibles: ${STATE.cuadrosVisibles}`);
  console.log(`🎬 ScrollTriggers: ${ScrollTrigger.getAll().length}`);
  console.log(`🖼️ Imágenes: ${PERSONAJES.length}`);
  console.log(`⚙️ Total: ${CONFIG.total}`);
}

function activarEfectoCortinaMapa() {
  // Esta función ahora es redundante ya que el control se hace por el contenedor unificado
  // Se mantiene para retrocompatibilidad pero sin funcionalidad activa
  const contenedorUnificado = document.querySelector('.contenedor-titulo-mapa');
  
  if (!contenedorUnificado) {
    console.warn('⚠️ No se encontró el contenedor unificado título-mapa');
    return;
  }
  
  console.log('✅ activarEfectoCortinaMapa: Función actualizada. Control real en configurarControlUnificadoScroll()');
}

function reiniciarAplicacion() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  document.querySelectorAll('.cuadro').forEach(cuadro => cuadro.remove());
  
  STATE.cuadrosVisibles = 0;
  
  inicializarPersonajeEspecial();
  
  setTimeout(inicializarAplicacion, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarAplicacion);
} else {
  inicializarAplicacion();
}

window.inicializarAplicacion = inicializarAplicacion;
window.mostrarEstadisticas = mostrarEstadisticas;
window.reiniciarAplicacion = reiniciarAplicacion;
window.activarEfectoCortinaMapa = activarEfectoCortinaMapa; 