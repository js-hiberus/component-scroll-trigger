// ===== GESTIÓN DE PERSONAJES Y DATOS =====

// Estructura unificada: personajes con imágenes
const PERSONAJES = [
  {
    id: 'personaje-1',
    imagen: 'PERSONAJES PRESENTACION/a6dead66-a24a-4bc3-ac05-16e287c81cee-1.png'
  },
  {
    id: 'personaje-2', 
    imagen: 'PERSONAJES PRESENTACION/1d61c3b9-d995-4505-8503-d9cd43fee078.png'
  },
  {
    id: 'personaje-3',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4.png'
  },
  {
    id: 'personaje-4',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-41.png'
  },
  {
    id: 'personaje-5',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-422.png'
  },
  {
    id: 'personaje-6',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-4222.png'
  },
  {
    id: 'personaje-7',
    imagen: 'PERSONAJES PRESENTACION/Sin ti╠ütulo-42222.png'
  },
  {
    id: 'personaje-8',
    imagen: 'PERSONAJES PRESENTACION/0263935d-60a4-4588-a8c0-2e5c53f39246.png'
  },
  {
    id: 'personaje-9',
    imagen: 'PERSONAJES PRESENTACION/05fe8d8a-f40c-466a-9eea-de67882e8462.png'
  },
  {
    id: 'personaje-10',
    imagen: 'PERSONAJES PRESENTACION/06758c23-507d-4e2a-b7d1-533a5398cd28.png'
  },
  {
    id: 'personaje-11',
    imagen: 'PERSONAJES PRESENTACION/10a655fe-2aef-445e-8efd-39463fbab1fe.png'
  },
  {
    id: 'personaje-12',
    imagen: 'PERSONAJES PRESENTACION/1ac87812-7157-4770-b3df-1c7bcd634660.png'
  },
  {
    id: 'personaje-13',
    imagen: 'PERSONAJES PRESENTACION/2f22cab5-4c85-46b9-ba3c-a218d7e30d03.png'
  },
  {
    id: 'personaje-14',
    imagen: 'PERSONAJES PRESENTACION/3647a5f1-7c43-4f49-b93f-fd814c750c2f.png'
  },
  {
    id: 'personaje-15',
    imagen: 'PERSONAJES PRESENTACION/3ad98faa-5620-48ae-9d5c-fc57a704d283-1.png'
  },
  {
    id: 'personaje-16',
    imagen: 'PERSONAJES PRESENTACION/56e4554d-262a-46d1-b055-12f4507b360e.png'
  },
  {
    id: 'personaje-17',
    imagen: 'PERSONAJES PRESENTACION/5ac2ad31-5805-4845-a673-f4425fe1a528.png'
  },
  {
    id: 'personaje-18',
    imagen: 'PERSONAJES PRESENTACION/981c1a0e-4572-462e-b816-ceef827c46f3.png'
  },
  {
    id: 'personaje-19',
    imagen: 'PERSONAJES PRESENTACION/a896d580-11b9-4584-a33a-f3ded7b7469b.png'
  },
  {
    id: 'personaje-20',
    imagen: 'PERSONAJES PRESENTACION/aabc9875-424e-452f-a2d3-8886ac9a6c6f.png'
  },
  {
    id: 'personaje-21',
    imagen: 'PERSONAJES PRESENTACION/d5b91333-ec05-45bc-94ee-b71e436502fe.png'
  }
];

// Variables del personaje especial
let personajeEspecial = null;
let indicePersonajeEspecial = null;

/**
 * Selecciona aleatoriamente un personaje para ser el "especial" 
 * cada vez que se recarga la página
 */
function inicializarPersonajeEspecial() {
  // Generar índice aleatorio entre 0 y 20 (21 personajes total)
  indicePersonajeEspecial = Math.floor(Math.random() * PERSONAJES.length);
  
  // Configurar el personaje especial con los datos del personaje seleccionado
  personajeEspecial = {
    id: PERSONAJES[indicePersonajeEspecial].id,
    imagen: PERSONAJES[indicePersonajeEspecial].imagen,
    indice: indicePersonajeEspecial,
    posicion: {
      left: 1450,
      top: STATE.centerY - 509,
      width: 265,
      height: 1018
    }
  };
  
  console.log(`🎭 Personaje especial seleccionado: ${personajeEspecial.id} (índice: ${indicePersonajeEspecial})`);
  console.log(`📸 Imagen: ${personajeEspecial.imagen}`);
  
  return personajeEspecial;
}

/**
 * Función global para mostrar información del personaje especial actual
 */
function mostrarPersonajeEspecial() {
  console.log("🎭 === INFORMACIÓN PERSONAJE ESPECIAL ===");
  console.log(`ID: ${personajeEspecial.id}`);
  console.log(`Imagen: ${personajeEspecial.imagen}`);
  console.log(`Índice: ${indicePersonajeEspecial}`);
  console.log(`Posición: left=${personajeEspecial.posicion.left}, top=${personajeEspecial.posicion.top}`);
  console.log("=" .repeat(45));
}

/**
 * Función global para cambiar manualmente el personaje especial
 */
function cambiarPersonajeEspecial(nuevoIndice) {
  if (nuevoIndice < 0 || nuevoIndice >= PERSONAJES.length) {
    console.error(`❌ Índice inválido. Debe estar entre 0 y ${PERSONAJES.length - 1}`);
    return;
  }
  
  console.log(`🔄 Cambiando personaje especial del índice ${indicePersonajeEspecial} al ${nuevoIndice}`);
  
  // Actualizar variables globales
  indicePersonajeEspecial = nuevoIndice;
  personajeEspecial.id = PERSONAJES[nuevoIndice].id;
  personajeEspecial.imagen = PERSONAJES[nuevoIndice].imagen;
  personajeEspecial.indice = nuevoIndice;
  
  console.log(`✅ Nuevo personaje especial: ${personajeEspecial.id}`);
  console.log("⚠️ Nota: Recarga la página para ver los cambios visualmente");
}

/**
 * Función para cambiar imagen específica dinámicamente
 */
function cambiarImagen(numeroElemento, nuevaURL) {
  if (numeroElemento < 1 || numeroElemento > CONFIG.total) {
    console.error(`Elemento ${numeroElemento} no existe. Debe estar entre 1 y ${CONFIG.total}`);
    return;
  }
  
  // Actualizar en el array
  PERSONAJES[numeroElemento - 1].imagen = nuevaURL;
  
  // Actualizar en el DOM si ya existe
  const elementos = document.querySelectorAll('.cuadro');
  if (elementos[numeroElemento - 1]) {
    const img = elementos[numeroElemento - 1].querySelector('img');
    if (img) {
      img.src = nuevaURL;
      console.log(`✅ Imagen del elemento ${numeroElemento} actualizada`);
    }
  }
}

// Inicializar el personaje especial al cargar la página
inicializarPersonajeEspecial();

// Exportar para uso global
window.PERSONAJES = PERSONAJES;
window.personajeEspecial = personajeEspecial;
window.indicePersonajeEspecial = indicePersonajeEspecial;
window.mostrarPersonajeEspecial = mostrarPersonajeEspecial;
window.cambiarPersonajeEspecial = cambiarPersonajeEspecial;
window.cambiarImagen = cambiarImagen; 