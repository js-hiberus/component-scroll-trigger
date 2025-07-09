function actualizarMonitor() {
  if (!ELEMENTS.monitor) return;
  
  const memoria = performance.memory 
    ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)} MB`
    : 'N/D';
  
  ELEMENTS.monitor.innerHTML = `
    🧱 Cuadros: ${STATE.cuadrosVisibles}<br>
    🧠 Memoria: ${memoria}<br>
    🚀 FPS: ${STATE.fps}<br>
    📐 Expansión: ${(window.innerWidth * 0.95).toFixed(0)}px
  `;
}

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

function inicializarMonitoreoRendimiento() {
  setInterval(actualizarMonitor, CONFIG.performanceInterval);
  requestAnimationFrame(trackFPS);
}

window.inicializarMonitoreoRendimiento = inicializarMonitoreoRendimiento;
window.trackFPS = trackFPS; 