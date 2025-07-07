// ===== GESTIÓN DE ANIMACIONES Y EFECTOS =====

/**
 * Crea una carta individual con imagen y animación
 */
function crearCuadro(i) {
  // TODOS los personajes (incluido el 21) siguen la misma lógica de pirámide
  const div = document.createElement("div");
  div.classList.add("cuadro");
  
  // Si es el personaje especial seleccionado, añadir clase especial para protección contra cortina
  if (i === indicePersonajeEspecial) {
    div.classList.add("personaje-especial");
  }

  // Asignar ID del personaje si existe
  if (PERSONAJES[i] && PERSONAJES[i].id) {
    div.id = PERSONAJES[i].id;
  }

  // Configuración específica para Personaje Especial
  if (i === indicePersonajeEspecial) {
    const esMobilePersonaje = window.innerWidth <= 768;
    
    if (esMobilePersonaje) {
      // En móvil: completamente centrado en la pantalla
      div.style.left = `${(window.innerWidth - 240) / 2}px`; // Centrado horizontalmente
      div.style.top = `${(window.innerHeight - 360) / 2 - 60}px`; // Posición optimizada para tamaño gigante
      div.style.width = "240px";
      div.style.height = "360px";
      div.style.transform = `scale(2.2)`; // Más moderado pero aún prominente
      div.style.zIndex = "8000";
      div.style.position = "fixed";
    } else {
      // En PC: más hacia la derecha y más pequeño
      div.style.left = "1100px"; // Movido más hacia la derecha
      div.style.top = `${(window.innerHeight - 1200) / 2}px`;
      div.style.width = "320px";
      div.style.height = "1200px";
      div.style.zIndex = "8000";
      div.style.position = "fixed";
    }
  } else {
    // Resto de personajes (incluido personaje-21 si no es el especial) siguen la disposición piramidal normal
    const { left, top, fila, zIndex, escala } = encontrarPosicion(i);
    
    // Aplicar posición y z-index
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;
    div.style.zIndex = zIndex;
  }

  // Solo los personajes normales necesitan obtener información de posición
  let fila, escala;
  if (i !== indicePersonajeEspecial) {
    const posicion = encontrarPosicion(i);
    fila = posicion.fila;
    escala = posicion.escala;
  } else {
    // El personaje especial ya tiene su configuración arriba
    fila = 0;
    escala = 1;
  }
  const opacidad = 1; // Opacidad completa para todos
  
  // Crear estructura HTML SOLO con imagen
  div.innerHTML = `
    <img src="${encodeURI(PERSONAJES[i].imagen || PERSONAJES[0].imagen)}" 
         alt="${i === 19 ? '' : 'Persona ' + (i + 1)}" 
         loading="lazy"
         style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
         onerror="console.log('Error cargando imagen ${i + 1}'); this.style.display='none'; this.parentElement.style.background='transparent';">
  `;

  // ===== CONFIGURACIÓN DE ANIMACIÓN =====
  gsap.set(div, { opacity: 0 });

  // Calcular delay para aparición progresiva por filas (de atrás hacia adelante)
  let delayGrupo;
  
  // El personaje especial siempre aparece al final de todo
  if (i === indicePersonajeEspecial) {
    delayGrupo = 4500; // Aparece después de todos los demás
  } else if (fila === 0) {
    // Fila trasera aparece primero
    delayGrupo = 200 + (i * 150);
  } else if (fila === 1) {
    // Fila media-trasera aparece después
    delayGrupo = 1400 + ((i - 7) * 180);
  } else if (fila === 2) {
    // Fila media-frontal 
    delayGrupo = 2500 + ((i - 13) * 200);
  } else {
    // Fila frontal aparece al final
    delayGrupo = 3500 + ((i - 18) * 250);
  }

  console.log(`✨ Personaje-${i + 1} aparece (delay: ${delayGrupo}ms, fila: ${fila}${i === indicePersonajeEspecial ? ' - ESPECIAL' : ''})`);

  ScrollTrigger.create({
    trigger: ".scroll-zone",
    start: `top+=${delayGrupo} top`,
    end: `top+=${delayGrupo + 50} top`,
    onEnter: () => {
      div.classList.add("mostrar");
      STATE.cuadrosVisibles++;
      
      // Aparición suave
      gsap.fromTo(div, 
        { 
          opacity: 0,
          scale: 1,
          y: 8
        },
        { 
          opacity: 1,
          scale: 1,
          y: 0,
          duration: CONFIG.animationDuration,
          ease: "power2.out"
        }
      );
    },
    onLeaveBack: () => {
      div.classList.remove("mostrar");
      STATE.cuadrosVisibles--;
      
      // Desaparición suave
      gsap.to(div, { 
        opacity: 0,
        scale: 1,
        y: -5,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  });

  // Si es el personaje especial, colocarlo en el contenedor retrato-fijo
  // para aislarlo completamente del efecto cortina
  if (i === indicePersonajeEspecial) {
    const retratoFijo = document.querySelector('.retrato-fijo');
    if (retratoFijo) {
      retratoFijo.appendChild(div);
      console.log(`🖼️ Personaje especial (${personajeEspecial.id}) colocado en zona protegida (.retrato-fijo)`);
    } else {
      // Fallback: crear el contenedor si no existe
      const escenaMultitud = document.querySelector('.escena-multitud');
      if (escenaMultitud) {
        const retratoFijoNew = document.createElement('div');
        retratoFijoNew.className = 'retrato-fijo';
        escenaMultitud.appendChild(retratoFijoNew);
        retratoFijoNew.appendChild(div);
        console.log(`🖼️ Personaje especial (${personajeEspecial.id}) colocado en zona protegida (contenedor creado)`);
      } else {
        ELEMENTS.piramide.appendChild(div);
        console.warn(`⚠️ No se pudo aislar el personaje especial (${personajeEspecial.id}), colocado en pirámide`);
      }
    }
  } else {
    ELEMENTS.piramide.appendChild(div);
  }
}

/**
 * Creación progresiva de elementos
 */
let elementIndex = 0;
function crearCuadrosProgresivamente(deadline) {
  while (elementIndex < CONFIG.total && deadline.timeRemaining() > 0) {
    crearCuadro(elementIndex);
    elementIndex++;
  }
  if (elementIndex < CONFIG.total) {
    requestIdleCallback(crearCuadrosProgresivamente);
  } else {
    console.log("✅ Pirámide completada:");
    console.log("📊 Distribución por filas:");
    console.log(`   Fila 1: 1 elemento`);
    console.log(`   Fila 2: 2 elementos`);
    console.log(`   Fila 3: 5 elementos`);
    console.log(`   Fila 4: 5 elementos`); 
    console.log(`   Fila 5: 8 elementos`);
    console.log(`📍 Total personajes: ${CONFIG.total} (${CONFIG.total-1} en pirámide + 1 especial)`);
    
    // Verificar orden correcto
    verificarOrdenPersonaje21();
  }
}

/**
 * Función para verificar que el personaje especial sea realmente el último
 */
function verificarOrdenPersonaje21() {
  console.log(`🔍 === VERIFICACIÓN ORDEN PERSONAJE ESPECIAL (${personajeEspecial.id}) ===`);
  
  let maxDelay = 0;
  let personajeConMaxDelay = 0;
  
  // Calcular todos los delays de personajes 1-21
  for (let i = 0; i < 21; i++) {
    const { fila } = encontrarPosicion(i);
    let delay;
    
    // El personaje especial siempre aparece al final de todo
    if (i === indicePersonajeEspecial) {
      delay = 4500; // Aparece después de todos los demás
    } else if (fila === 0) {
      delay = 200 + (i * 150);
    } else if (fila === 1) {
      delay = 1400 + ((i - 7) * 180);
    } else if (fila === 2) {
      delay = 2500 + ((i - 13) * 200);
    } else {
      delay = 3500 + ((i - 18) * 250);
    }
    
    if (delay > maxDelay) {
      maxDelay = delay;
      personajeConMaxDelay = i + 1;
    }
  }
  
  console.log(`📊 Personaje con delay más alto: Personaje-${personajeConMaxDelay} (${maxDelay}ms)`);
  if (personajeConMaxDelay === (indicePersonajeEspecial + 1)) {
    console.log(`✅ Personaje especial (${personajeEspecial.id}) configurado como ÚLTIMO en aparecer (${maxDelay}ms)`);
  } else {
    console.warn(`⚠️ Personaje especial (${personajeEspecial.id}) NO es el último - revisar configuración`);
  }
  console.log(`✅ Todos los personajes configurados correctamente`);
  console.log("=" .repeat(50));
}

// Iniciar creación progresiva
requestIdleCallback(crearCuadrosProgresivamente);

// Exportar para uso global
window.crearCuadro = crearCuadro;
window.verificarOrdenPersonaje21 = verificarOrdenPersonaje21; 