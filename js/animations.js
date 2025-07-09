// ===== GESTIÓN DE ANIMACIONES Y EFECTOS =====

/**
 * Crea una carta individual con imagen y animación
 */
function crearCuadro(i) {
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  if (i === indicePersonajeEspecial) {
    div.classList.add("personaje-especial");
  }

  if (PERSONAJES[i]?.id) {
    div.id = PERSONAJES[i].id;
  }

  configurarPosicionPersonaje(div, i);
  
  const { fila, escala } = obtenerDatosPersonaje(i);
  
  div.innerHTML = `
    <img src="${encodeURI(PERSONAJES[i]?.imagen || PERSONAJES[0].imagen)}" 
         alt="Persona ${i + 1}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
         onerror="this.style.display='none'; this.parentElement.style.background='transparent';">
  `;

  gsap.set(div, { opacity: 0 });

  const delayGrupo = calcularDelayAnimacion(i, fila);

  ScrollTrigger.create({
    trigger: ".scroll-zone",
    start: `top+=${delayGrupo} top`,
    end: `top+=${delayGrupo + 50} top`,
    onEnter: () => animarEntrada(div, i),
    onLeaveBack: () => animarSalida(div)
  });

  colocarEnContenedor(div, i);
}

function configurarPosicionPersonaje(div, i) {
  if (i === indicePersonajeEspecial) {
    const esMobile = window.innerWidth <= 768;
    
    if (esMobile) {
      Object.assign(div.style, {
        left: `${window.innerWidth * 0.5 - 140}px`,
        top: `${window.innerHeight * 0.55}px`,
        width: "280px",
        height: "420px",
        transform: "scale(1.3)",
        zIndex: "9000",
        position: "fixed"
      });
    } else {
      Object.assign(div.style, {
        left: "1100px",
        top: `${(window.innerHeight - 1200) / 2}px`,
        width: "320px",
        height: "1200px",
        zIndex: "8000",
        position: "fixed"
      });
    }
  } else {
    const { left, top, zIndex, escala } = encontrarPosicion(i);
    Object.assign(div.style, {
      left: `${left}px`,
      top: `${top}px`,
      zIndex: zIndex
    });
    
    if (window.innerWidth <= 768) {
      div.style.transform = `scale(${escala})`;
    }
    }
  }

function obtenerDatosPersonaje(i) {
  if (i !== indicePersonajeEspecial) {
    const posicion = encontrarPosicion(i);
    return { fila: posicion.fila, escala: posicion.escala };
  }
  return { fila: 0, escala: 1 };
  }

function calcularDelayAnimacion(i, fila) {
  const esMobile = window.innerWidth <= 768;
  
  if (esMobile) {
  if (i === indicePersonajeEspecial) {
      return 3000;
    }
    const filaMultitud = Math.floor(i / 5);
    return 200 + (filaMultitud * 400) + ((i % 5) * 100);
  } else {
    if (i === indicePersonajeEspecial) {
      return 4500;
    }
    
    // Configuración para las 5 filas: [1, 2, 5, 5, 8] elementos
    const delays = [200, 1400, 2500, 3500, 4000];    // Delay base por fila
    const offsets = [150, 180, 200, 250, 100];       // Espaciado entre elementos de la misma fila
    const bases = [0, 1, 3, 8, 13];                  // Índice donde comienza cada fila
    
    if (fila >= delays.length) {
      console.warn(`Fila ${fila} fuera de rango para personaje ${i}`);
      return 4000;
    }
    
    return delays[fila] + ((i - bases[fila]) * offsets[fila]);
  }
}

function animarEntrada(div, i) {
      div.classList.add("mostrar");
      STATE.cuadrosVisibles++;
      
  const esProtagonista = i === indicePersonajeEspecial;
  
      gsap.fromTo(div, 
        { 
          opacity: 0,
      scale: esProtagonista ? 1.1 : 1,
      y: esProtagonista ? 12 : 8
        },
        { 
          opacity: 1,
      scale: esProtagonista ? 1 : 1,
          y: 0,
      duration: esProtagonista ? 0.8 : CONFIG.animationDuration,
          ease: "power2.out",
          onComplete: () => {
            if (STATE.cuadrosVisibles === 1 && window.innerWidth <= 768) {
          mostrarFlechaMovil?.();
            }
          }
        }
      );
}

function animarSalida(div) {
      div.classList.remove("mostrar");
      STATE.cuadrosVisibles--;
      
      gsap.to(div, { 
        opacity: 0,
        scale: 1,
        y: -5,
        duration: 0.4,
        ease: "power2.in"
      });
    }

function colocarEnContenedor(div, i) {
  if (i === indicePersonajeEspecial) {
    const retratoFijo = document.querySelector('.retrato-fijo');
    if (retratoFijo) {
      retratoFijo.appendChild(div);
    } else {
      crearContenedorProtegido(div);
    }
  } else {
    ELEMENTS.piramide.appendChild(div);
  }
}

function crearContenedorProtegido(div) {
  const escenaMultitud = document.querySelector('.escena-multitud');
  if (escenaMultitud) {
    const retratoFijo = document.createElement('div');
    retratoFijo.className = 'retrato-fijo';
    escenaMultitud.appendChild(retratoFijo);
    retratoFijo.appendChild(div);
  } else {
    ELEMENTS.piramide.appendChild(div);
  }
}

let elementIndex = 0;
function crearCuadrosProgresivamente(deadline) {
  while (elementIndex < CONFIG.total && deadline.timeRemaining() > 0) {
    crearCuadro(elementIndex);
    elementIndex++;
  }
  
  if (elementIndex < CONFIG.total) {
    requestIdleCallback(crearCuadrosProgresivamente);
  } else {
    console.log("Pirámide completada");
    verificarOrdenPersonaje21();
  }
}

function verificarOrdenPersonaje21() {
  const personaje21 = document.getElementById('personaje-21');
  if (personaje21 && personaje21.classList.contains('personaje-especial')) {
    const retratoFijo = document.querySelector('.retrato-fijo');
    if (retratoFijo && !retratoFijo.contains(personaje21)) {
      retratoFijo.appendChild(personaje21);
    }
  }
  
  // Debug: verificar que todos los personajes se crearon
  const totalCreados = document.querySelectorAll('.cuadro').length;
  console.log(`✅ Pirámide completada: ${totalCreados}/${CONFIG.total} personajes creados`);
  
  if (totalCreados < CONFIG.total) {
    console.warn(`⚠️ Faltan ${CONFIG.total - totalCreados} personajes`);
    
    // Mostrar qué personajes faltan
    for (let i = 0; i < CONFIG.total; i++) {
      const personaje = document.getElementById(`personaje-${i + 1}`);
      if (!personaje) {
        console.warn(`❌ Falta personaje-${i + 1} (índice ${i})`);
      }
    }
  }
  
  // Verificar si hay problemas en DISPOSICION_MANUAL
  console.log(`📊 DISPOSICION_MANUAL tiene ${DISPOSICION_MANUAL.length} configuraciones`);
  if (DISPOSICION_MANUAL.length < CONFIG.total) {
    console.error(`❌ DISPOSICION_MANUAL solo tiene ${DISPOSICION_MANUAL.length} configuraciones, necesita ${CONFIG.total}`);
  }
}

window.crearCuadro = crearCuadro;
window.crearCuadrosProgresivamente = crearCuadrosProgresivamente; 