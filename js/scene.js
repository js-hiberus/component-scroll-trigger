function inicializarEscenaMultitud() {
  const multitudContainer = document.querySelector('.multitud');
  const retratoFijoContainer = document.querySelector('.retrato-fijo');
  
  if (!multitudContainer || !retratoFijoContainer) {
    console.warn('Contenedores de multitud no encontrados');
    return;
  }

  configurarTextoEscenaMultitud();
  configurarControlUnificadoScroll();
  configurarFlechaMovil();
  
  // Configurar animación de la sección del mapa (ahora en flujo normal)
  configurarAnimacionSeccionMapa();
}

function configurarFlechaMovil() {
  const flechaMovil = document.getElementById('flecha-movil');
  const mapaContainer = document.querySelector('.mapa-container');
  
  if (!flechaMovil || !mapaContainer || window.innerWidth > 768) {
    return;
  }

  const irAlMapa = () => {
    const targetPosition = mapaContainer.offsetTop - 100;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    gsap.to(flechaMovil.parentElement, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  flechaMovil.addEventListener('click', irAlMapa);
}

function mostrarFlechaMovil() {
  const flechaContainer = document.querySelector('.flecha-movil-container');
  
  if (!flechaContainer || window.innerWidth > 768) {
    return;
  }
  
  gsap.to(flechaContainer, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3
  });
}

function configurarControlUnificadoScroll() {
  const multitudElement = document.querySelector('.multitud');
  const espacioBElement = document.querySelector('.espacio-b');
  const tituloElement = document.querySelector('.titulo-principal');
  
  if (!multitudElement || !espacioBElement || !tituloElement) {
    console.warn('Elementos para control unificado no encontrados');
    return;
  }

  const esMobile = window.innerWidth <= 1024;
  const prefiereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ScrollTrigger simplificado que solo maneja el efecto cortina de la multitud
  ScrollTrigger.create({
    trigger: espacioBElement,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const direction = self.direction;
      
      // Solo manejar la multitud y elementos del panel sticky
      aplicarEfectoCortina(progress, multitudElement, prefiereMovimientoReducido);
      manejarElementosSegunProgreso(progress, direction, tituloElement, esMobile);
      protegerPersonajeEspecial();
    }
  });
  
  // La sección del mapa aparece automáticamente después del scroll (flujo normal)
  // No necesita ScrollTrigger especial
}

function manejarElementosSegunProgreso(progress, direction, tituloElement, esMobile) {
  // Control unificado del contenedor título + mapa
  const contenedorUnificado = document.querySelector('.contenedor-titulo-mapa');
  
  if (!contenedorUnificado) {
    console.warn('Contenedor unificado título-mapa no encontrado');
    return;
  }
  
  // Tanto en móvil como desktop, el contenedor aparece más temprano
  const umbralAparicion = esMobile ? 0.1 : 0.15;
  const mostrarContenedor = progress > umbralAparicion;
  
  contenedorUnificado.classList.toggle('visible', mostrarContenedor);
  
  // Para retrocompatibilidad, seguir controlando el título individualmente en desktop
  if (!esMobile) {
    const opacity = Math.max(0.3, Math.min(1, progress * 2));
    tituloElement.style.opacity = opacity;
  }
}

// Función obsoleta - mantenida para compatibilidad
function activarSeccionMapa(seccionMapa) {
  console.warn('activarSeccionMapa() está obsoleta - la sección del mapa ahora está en el flujo normal de la web');
  // No hace nada - la sección del mapa aparece automáticamente
}

// Función obsoleta - mantenida para compatibilidad
function desactivarSeccionMapa(seccionMapa) {
  console.warn('desactivarSeccionMapa() está obsoleta - la sección del mapa ahora está en el flujo normal de la web');
  // No hace nada - la sección del mapa se oculta automáticamente
}

function protegerPersonajeEspecial() {
  const personajeEspecialOriginal = document.querySelector('.retrato-fijo .cuadro.personaje-especial');
  if (personajeEspecialOriginal) {
    Object.assign(personajeEspecialOriginal.style, {
      opacity: '1',
      filter: 'none',
      mask: 'none',
      webkitMask: 'none'
    });
  }
}

function aplicarEfectoCortina(progress, multitudElement, prefiereMovimientoReducido) {
  if (prefiereMovimientoReducido) {
    // Versión simplificada para accesibilidad
    multitudElement.style.opacity = Math.max(0, 1 - progress);
    multitudElement.classList.toggle('reduced-motion', progress > 0.8);
    return;
  }
  
  // Efecto cortina estándar para la multitud
  const wipeValue = Math.max(0, Math.min(100, progress * 100));
  multitudElement.style.maskImage = `linear-gradient(to top, transparent ${wipeValue}%, black ${wipeValue + 10}%)`;
  multitudElement.style.webkitMaskImage = `linear-gradient(to top, transparent ${wipeValue}%, black ${wipeValue + 10}%)`;
}

// Mantener función original para compatibilidad pero simplificada
function configurarAnimacionCortina() {
  console.warn('configurarAnimacionCortina() está obsoleta - usar configurarControlUnificadoScroll()');
}

// Configurar animación de elementos internos de la sección del mapa
function configurarAnimacionSeccionMapa() {
  const seccionMapa = document.querySelector('.seccion-mapa');
  
  if (!seccionMapa) {
    console.warn('Sección del mapa no encontrada');
    return;
  }

  // ScrollTrigger para animar elementos internos cuando la sección entre en el viewport
  ScrollTrigger.create({
    trigger: seccionMapa,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      animarElementosInternosSeccionMapa();
    },
    onEnterBack: () => {
      // Permitir re-animación si es necesario
      animarElementosInternosSeccionMapa.ejecutado = false;
      animarElementosInternosSeccionMapa();
    }
  });
}

// Función obsoleta - mantenida para compatibilidad
function manejarTextoYMapa(progress, tituloElement, esMobile) {
  console.warn('manejarTextoYMapa() está obsoleta - usar manejarElementosSegunProgreso()');
}

// Función obsoleta - mantenida para compatibilidad
function manejarTransicionUnificada(progress, direction, { multitudElement, tituloElement, esMobile, prefiereMovimientoReducido }) {
  console.warn('manejarTransicionUnificada() está obsoleta - usar aplicarEfectoCortina()');
  aplicarEfectoCortina(progress, multitudElement, prefiereMovimientoReducido);
  manejarElementosSegunProgreso(progress, direction, tituloElement, esMobile);
  protegerPersonajeEspecial();
}

// Función obsoleta - mantenida para compatibilidad
function aplicarEfectoCortinaContinuo(progress, multitudElement, seccionMapa, esMobile, prefiereMovimientoReducido) {
  console.warn('aplicarEfectoCortinaContinuo() está obsoleta - usar aplicarEfectoCortina()');
  aplicarEfectoCortina(progress, multitudElement, prefiereMovimientoReducido);
}

function configurarTextoEscenaMultitud() {
  const contenedorUnificado = document.querySelector('.contenedor-titulo-mapa');
  
  if (!contenedorUnificado) {
    console.warn('Contenedor unificado título-mapa no encontrado');
    return;
  }

  // Esta función ahora es redundante ya que el control se hace en configurarControlUnificadoScroll
  // Se mantiene para retrocompatibilidad pero sin funcionalidad
  console.log('configurarTextoEscenaMultitud: Función mantenida para compatibilidad. Control real en configurarControlUnificadoScroll()');
}

function manejarRedimensionamiento() {
  let resizeTimeout;
  
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      STATE.centerX = window.innerWidth / 2;
      STATE.centerY = window.innerHeight / 2;
      
      if (typeof actualizarPosicionesElementos === 'function') {
        actualizarPosicionesElementos();
      }
      
      ScrollTrigger.refresh();
    }, 100);
  };

  window.addEventListener('resize', handleResize);
}

manejarRedimensionamiento();

function ocultarPersonajeEspecialEnMapa() {
  // Esta función ahora es solo para compatibilidad
  console.log('Función ocultarPersonajeEspecialEnMapa llamada - usando nuevas funciones específicas');
}

function ocultarElementosPanel() {
  const elementosAOcultar = [
    '.personaje-especial',
    '.titulo-principal',
    '.mapa-container',
    '.cuadro',
    '.multitud',
    '.flecha-movil-container',
    '.piramide-container',
    '.retrato-fijo .cuadro'
  ];
  
  elementosAOcultar.forEach(selector => {
    const elementos = document.querySelectorAll(selector);
    elementos.forEach(elemento => {
      // Solo ocultar si NO está dentro de la sección del mapa
      if (elemento && !elemento.closest('.seccion-mapa')) {
        // Cancelar cualquier animación en progreso
        gsap.killTweensOf(elemento);
        
        gsap.to(elemento, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            elemento.style.pointerEvents = 'none';
            elemento.style.visibility = 'hidden';
          }
        });
      }
    });
  });
}

function mostrarElementosPanel() {
  const elementosAMostrar = [
    '.personaje-especial',
    '.titulo-principal',
    '.mapa-container',
    '.cuadro',
    '.multitud',
    '.flecha-movil-container',
    '.piramide-container',
    '.retrato-fijo .cuadro'
  ];
  
  elementosAMostrar.forEach(selector => {
    const elementos = document.querySelectorAll(selector);
    elementos.forEach(elemento => {
      // Solo mostrar si NO está dentro de la sección del mapa
      if (elemento && !elemento.closest('.seccion-mapa')) {
        // Cancelar cualquier animación en progreso
        gsap.killTweensOf(elemento);
        
        elemento.style.pointerEvents = 'auto';
        elemento.style.visibility = 'visible';
        gsap.to(elemento, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  });
}

function animarElementosInternosSeccionMapa() {
  // Evitar múltiples ejecuciones
  if (animarElementosInternosSeccionMapa.ejecutado) {
    return;
  }
  animarElementosInternosSeccionMapa.ejecutado = true;
  
  const elementosInternos = [
    '.info-autor',
    '.iconos-redes',
    '.texto-descriptivo',
    '.texto-adicional'
  ];

  elementosInternos.forEach((selector, index) => {
    const elemento = document.querySelector(selector);
    if (elemento) {
      gsap.fromTo(elemento, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out"
        }
      );
    }
  });
  
  // Resetear el flag después de un tiempo para permitir re-ejecución si es necesario
  setTimeout(() => {
    animarElementosInternosSeccionMapa.ejecutado = false;
  }, 2000);
}

window.inicializarEscenaMultitud = inicializarEscenaMultitud;
window.mostrarFlechaMovil = mostrarFlechaMovil;
window.manejarRedimensionamiento = manejarRedimensionamiento;
window.configurarControlUnificadoScroll = configurarControlUnificadoScroll;
window.ocultarPersonajeEspecialEnMapa = ocultarPersonajeEspecialEnMapa;
window.animarElementosInternosSeccionMapa = animarElementosInternosSeccionMapa;
window.ocultarElementosPanel = ocultarElementosPanel;
window.mostrarElementosPanel = mostrarElementosPanel;
window.manejarElementosSegunProgreso = manejarElementosSegunProgreso;
// Función principal
window.aplicarEfectoCortina = aplicarEfectoCortina;
// Funciones de compatibilidad
window.configurarAnimacionCortina = configurarAnimacionCortina;
window.configurarAnimacionSeccionMapa = configurarAnimacionSeccionMapa;
window.manejarTextoYMapa = manejarTextoYMapa;
window.manejarTransicionUnificada = manejarTransicionUnificada;
window.aplicarEfectoCortinaContinuo = aplicarEfectoCortinaContinuo;
window.activarSeccionMapa = activarSeccionMapa;
window.desactivarSeccionMapa = desactivarSeccionMapa; 