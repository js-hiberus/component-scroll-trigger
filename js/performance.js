// ===== MONITOREO DE RENDIMIENTO =====

/**
 * Actualiza el monitor de rendimiento
 */
function actualizarMonitor() {
  if (performance.memory) {
    const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
    ELEMENTS.monitor.innerHTML = `🧱 Cuadros visibles: ${STATE.cuadrosVisibles}<br>🧠 Memoria: ${usedMB} MB<br>🚀 FPS: ${STATE.fps}<br>🏗️ Filas piramidales: ${CONFIG.total-1}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
  } else {
    ELEMENTS.monitor.innerHTML = `🧱 Cuadros visibles: ${STATE.cuadrosVisibles}<br>🧠 Memoria: N/D<br>🚀 FPS: ${STATE.fps}<br>🏗️ Filas piramidales: ${CONFIG.total-1}<br>📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px`;
  }
}

/**
 * Tracking de FPS
 */
function trackFPS(now) {
  STATE.frameCount++;
  const delta = now - STATE.lastTime;
  if (delta >= 1000) {
    STATE.fps = Math.round((STATE.frameCount / delta) * 1000);
    STATE.frameCount = 0;
    STATE.lastTime = now;
  }
  requestAnimationFrame(trackFPS);
}

/**
 * Inicializar monitoreo de rendimiento
 */
function inicializarMonitoreoRendimiento() {
  // Actualizar monitor cada 500ms
  setInterval(actualizarMonitor, CONFIG.performanceMonitorInterval);
  
  // Iniciar tracking de FPS
  requestAnimationFrame(trackFPS);
  
  console.log("✅ Monitoreo de rendimiento iniciado");
}

// Exportar para uso global
window.inicializarMonitoreoRendimiento = inicializarMonitoreoRendimiento;
window.trackFPS = trackFPS; 