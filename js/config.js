gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  total: 21,
  enableDebug: false,
  animationDuration: 0.6,
  staggerDelay: 0.03,
  performanceInterval: 1000
};

const ELEMENTS = {
  piramide: document.getElementById("piramide"),
  monitor: document.getElementById("monitor"),
  scrollZone: document.querySelector(".scroll-zone"),
  escenaMultitud: document.querySelector(".escena-multitud"),
  multitud: document.querySelector(".multitud"),
  retratoFijo: document.querySelector(".retrato-fijo"),
  titulo: document.querySelector(".titulo-principal")
};

const STATE = {
  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,
  cuadrosVisibles: 0,
  fps: 0,
  frameCount: 0,
  lastTime: performance.now(),
  isInitialized: false
};

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.CONFIG = CONFIG;
window.ELEMENTS = ELEMENTS;
window.STATE = STATE; 