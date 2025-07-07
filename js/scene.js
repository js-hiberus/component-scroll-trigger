// ===== ESCENA DE MULTITUD Y EFECTOS ESPECIALES =====

/**
 * Inicializar la escena de multitud
 */
function inicializarEscenaMultitud() {
  const multitudContainer = document.querySelector('.multitud');
  const retratoFijoContainer = document.querySelector('.retrato-fijo');
  
  if (!multitudContainer || !retratoFijoContainer) {
    console.warn('⚠️ Contenedores de multitud no encontrados');
    return;
  }

  // Configurar la animación del texto cuando la escena sea visible
  configurarTextoEscenaMultitud();
  
  // Configurar la animación de cortina ascendente
  configurarAnimacionCortina();
  
  console.log(`✅ Escena de personaje especial inicializada: ${personajeEspecial.id} visible (sin multitud)`);
}

/**
 * Configurar la animación de cortina ascendente con GSAP
 */
function configurarAnimacionCortina() {
  const multitudElement = document.querySelector('.multitud');
  const espacioBElement = document.querySelector('.espacio-b');
  const tituloElement = document.querySelector('.titulo-principal');
  
  if (!multitudElement || !espacioBElement || !tituloElement) {
    console.warn('⚠️ Elementos para animación de cortina no encontrados');
    return;
  }

  // Detectar si es móvil/tablet para comportamiento específico del texto
  const esMobile = window.innerWidth <= 1024;
  
  // Verificar si el usuario prefiere movimiento reducido
  const prefieereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefieereMovimientoReducido) {
    // Versión simplificada sin máscara para accesibilidad
    gsap.timeline({
      scrollTrigger: {
        trigger: espacioBElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          // Aplicar solo cambio de opacidad sin máscara
          const progress = self.progress;
          multitudElement.style.opacity = Math.max(0, 1 - progress);
          
          // Proteger siempre al personaje especial original (ahora en .retrato-fijo)
          const personajeEspecialOriginal = document.querySelector('.retrato-fijo .cuadro.personaje-especial');
          if (personajeEspecialOriginal) {
            personajeEspecialOriginal.style.opacity = '1';
            personajeEspecialOriginal.style.filter = 'none';
            personajeEspecialOriginal.style.mask = 'none';
            personajeEspecialOriginal.style.webkitMask = 'none';
          }
          
          // Comportamiento diferente según dispositivo
          if (esMobile) {
            // En móvil: texto Y mapa aparecen con efecto cortina
            const mapaElement = document.querySelector('.mapa-svg');
            if (progress > 0.3) {
              tituloElement.style.opacity = '1';
              if (mapaElement) {
                mapaElement.classList.add('visible');
              }
            } else {
              tituloElement.style.opacity = '0';
              if (mapaElement) {
                mapaElement.classList.remove('visible');
              }
            }
          } else {
            // En Desktop: texto siempre visible
            tituloElement.style.opacity = '1';
          }
          
          if (progress > 0.8) {
            multitudElement.classList.add('reduced-motion');
          } else {
            multitudElement.classList.remove('reduced-motion');
          }
        }
      }
    });
  } else {
    // Versión completa con máscara y efectos SOLO para la multitud
    gsap.timeline({
      scrollTrigger: {
        trigger: espacioBElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log(`🎭 Progreso cortina: ${(progress * 100).toFixed(1)}%`);
          
          // Asegurar que el personaje especial original NUNCA se vea afectado (ahora en .retrato-fijo)
          const personajeEspecialOriginal = document.querySelector('.retrato-fijo .cuadro.personaje-especial');
          if (personajeEspecialOriginal) {
            personajeEspecialOriginal.style.opacity = '1';
            personajeEspecialOriginal.style.filter = 'none';
            personajeEspecialOriginal.style.mask = 'none';
            personajeEspecialOriginal.style.webkitMask = 'none';
          }
          
          // Comportamiento diferente según dispositivo
          if (esMobile) {
            // En móvil: texto Y mapa aparecen con efecto cortina
            const mapaElement = document.querySelector('.mapa-svg');
            if (progress > 0.3) {
              tituloElement.style.opacity = '1';
              if (mapaElement) {
                mapaElement.classList.add('visible');
              }
            } else {
              tituloElement.style.opacity = '0';
              if (mapaElement) {
                mapaElement.classList.remove('visible');
              }
            }
          } else {
            // En Desktop: texto siempre visible
            tituloElement.style.opacity = '1';
          }
        }
      }
    })
    .to(multitudElement, {
      "--wipe": "100%",
      opacity: 0,
      filter: "blur(6px)",
      ease: "none",
      duration: 1
    });
  }

  console.log(`✅ Animación de cortina configurada (Movimiento reducido: ${prefieereMovimientoReducido})`);
}

/**
 * Configurar la secuencia: Personaje-21 primero, luego el texto
 */
function configurarTextoEscenaMultitud() {
  const tituloElement = document.querySelector('.titulo-principal');
  const escenaMultitud = document.querySelector('.escena-multitud');
  const espacioBElement = document.querySelector('.espacio-b');
  
  if (!tituloElement || !escenaMultitud || !espacioBElement) {
    console.warn('⚠️ Elementos para secuencia de escena no encontrados');
    return;
  }

  // Detectar si es móvil para comportamiento específico
  const esMobile = false; // Forzar efecto de PC también en móvil (patch v3 2025-07-02)
  
  if (esMobile) {
    ScrollTrigger.create({
      trigger: escenaMultitud,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        const personajesPiramide = document.querySelectorAll('.cuadro:not(.personaje-especial).mostrar');
        gsap.to(personajesPiramide, {
          opacity: 0.25,
          scale: 0.98,
          duration: 1.2,
          ease: "power3.out",
          stagger: CONFIG.staggerDelay
        });
      },
      onLeaveBack: () => {
        const personajesPiramide = document.querySelectorAll('.cuadro:not(.personaje-especial).mostrar');
        gsap.to(personajesPiramide, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });
  } else {
    // EN PC: Animaciones del título eliminadas - siempre visible
    ScrollTrigger.create({
      trigger: escenaMultitud,
      start: "top 80%",
      end: "top 20%",
    });
  }

  console.log(`✅ Secuencia configurada para ${esMobile ? 'MÓVIL' : 'PC'}`);
}

/**
 * Manejar redimensionamiento responsivo
 */
function manejarRedimensionamiento() {
  let resizeTimeout;
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Refrescar ScrollTriggers después del redimensionamiento
      ScrollTrigger.refresh();
      
      // Actualizar posiciones de elementos
      actualizarPosicionesElementos();
      
      // Reconfigurar estado del mapa según nuevo tamaño
      const mapaSvg = document.querySelector('.mapa-svg');
      if (mapaSvg) {
        if (window.innerWidth > 1024) {
          // Desktop: mapa siempre visible
          mapaSvg.classList.add('visible');
        } else {
          // Mobile: reiniciar estado (será controlado por ScrollTrigger)
          mapaSvg.classList.remove('visible');
        }
      }
      
      // Detectar tipo de dispositivo
      const info = detectarTipoDispositivo();
      
      console.log(`🔄 Redimensionado a ${info.width}px - ${info.dispositivo}`);
      console.log(`🎬 ScrollTriggers actualizados: ${ScrollTrigger.getAll().length}`);
    }, 250);
  });
}

// Exportar para uso global
window.inicializarEscenaMultitud = inicializarEscenaMultitud;
window.configurarAnimacionCortina = configurarAnimacionCortina;
window.configurarTextoEscenaMultitud = configurarTextoEscenaMultitud;
window.manejarRedimensionamiento = manejarRedimensionamiento; 