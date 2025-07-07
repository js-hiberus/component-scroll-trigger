// ===== CONFIGURACIÓN Y CONSTANTES GLOBALES =====

// Inicializar GSAP
gsap.registerPlugin(ScrollTrigger);

// Configuración principal
const CONFIG = {
  total: 21, // Total de cartas a mostrar
  enableDebug: true,
  performanceMonitorInterval: 500,
  animationDuration: 0.6,
  staggerDelay: 0.03
};

// Variables globales del DOM
const ELEMENTS = {
  piramide: document.getElementById("piramide"),
  monitor: document.getElementById("monitor"),
  scrollZone: document.querySelector(".scroll-zone"),
  escenaMultitud: document.querySelector(".escena-multitud"),
  multitud: document.querySelector(".multitud"),
  retratoFijo: document.querySelector(".retrato-fijo"),
  tituloElement: document.querySelector(".titulo-principal")
};

// Variables de estado global
let STATE = {
  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,
  cuadrosVisibles: 0,
  faseActual: 1, // 1 = Primera fase (pirámide), 2 = Segunda fase (nuevo personaje)
  personajeEspecialCreado: false,
  fps: 0,
  frameCount: 0,
  lastTime: performance.now()
};

// Configuración de scroll suave
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Exportar para uso global
window.CONFIG = CONFIG;
window.ELEMENTS = ELEMENTS;
window.STATE = STATE; 