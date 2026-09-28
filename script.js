// Para acceder a los elementos del HTML ya no usamos document.getElementById —
// usamos document.querySelector, que acepta cualquier selector CSS (#id, .clase,
// etiqueta...) y no solo ids. Por ejemplo: document.querySelector("#filtro-nombre").

async function obtenerPersonajes() {
    const respuestas = await fetch("https://rickandmortyapi.com/api/character");

    const datos = await respuestas.json();

    return datos.results;

  

// TODO: pide "https://rickandmortyapi.com/api/character" con fetch, conviértela
// a JSON y devuelve el array de personajes (repasa el ejercicio 1 de la práctica).
}


function filtrarPorEstado(personajes, estado) {

    if (estado === ""){
        return personajes;
    }

    return personajes.filter(item => item.status === estado);

  // TODO: si estado viene vacío, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 2 de la práctica).
}

function filtrarPorEspecie(personajes, especie) {

    if (especie === ""){
        return personajes;
    }

    return personajes.filter(item => item.species === especie);
  // TODO: si especie viene vacía, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 3 de la práctica).
}

function ordenarPersonajes (personajes){

    return personajes.sort((a,b) => a.name.localeCompare(b.name));

}

function diezPrimeros (personajes) {
  return personajes.slice(0,10);
}

function buscarNombre (personajes, nombre) {
  return personajes.map(item => item.name.toLowerCase()).indexOf(nombre);
}

function hayMuertos (personajes) {
  return personajes.some (item => item.status === "Dead");
}

function hayVivos (personajes) {
  return personajes.every (item => item.status === "Alive");
}

function contarVivos (personajes) {

  return personajes.reduce ((acumulado, item) => item.status === "Alive" ? acumulado + 1 : acumulado, 0)
}

function contarMuertos (personajes) {

  return personajes.reduce ((acumulado, item) => item.status === "Dead" ? acumulado + 1 : acumulado, 0)
}

function contarDesconocidos (personajes) {

  return personajes.reduce ((acumulado, item) => item.status === "unknown" ? acumulado + 1 : acumulado, 0)
}

let personajes = [];


let mostrar10 = false;

function aplicarFiltros() {

  const nombre = document.querySelector("#filtro-nombre").value.trim().toLowerCase();
  const estado = document.querySelector("#filtro-estado").value;
  const especie = document.querySelector("#filtro-especie").value;
  
  
  const posicion = buscarNombre (personajes, nombre);
    if (posicion === -1) {
      document.querySelector("#resultado-busqueda").textContent = "Personaje no encontrado";
    }  
    else {
      document.querySelector("#resultado-busqueda").textContent = "Posición del personaje: " + (posicion+1);
    }
    

  let filtrados = filtrarPorEstado(personajes, estado);
  filtrados = filtrarPorEspecie(filtrados, especie);
  filtrados = filtrados.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(nombre);
  });


  if (mostrar10) {

    filtrados = diezPrimeros(filtrados);
  }

  pintarResultados(filtrados);
}

function pintarResultados(lista) {
  const contenedor = document.querySelector("#resultados");
  document.querySelector("#contador").textContent = "Total: " + lista.length;

  const totalVivos = contarVivos(lista);
  const totalMuertos = contarMuertos(lista);
  const totalDesconocidos = contarDesconocidos(lista);
  const hayPersonajesMuertos = hayMuertos(lista);
  const PersonajesVivos = hayVivos(lista);

  
  if (hayPersonajesMuertos) {
    document.querySelector("#aviso-muertos").textContent = "Hay muertos en el resultado";
  }
  else {
    document.querySelector("#aviso-muertos").textContent = "";
  }

  if (PersonajesVivos) {
    document.querySelector("#aviso-vivos").textContent = "Todos los personajes estan vivos";
  }
  else {
    document.querySelector("#aviso-vivos").textContent = "";
  }

  document.querySelector("#status-conteo").textContent = "Vivos: " + totalVivos + " - Muertos: " + totalMuertos + " - Desconocidos: " + totalDesconocidos;

  contenedor.innerHTML = lista
    .map(function (personaje) {
      return (
        '<article class="personaje-card">' +
        '<img src="' + personaje.image + '" alt="' + personaje.name + '" />' +
        "<h3>" + personaje.name + "</h3>" +
        "<p>" + personaje.status + " · " + personaje.species + "</p>" +
        "</article>"
      );
    })
    .join("");
}

document.querySelector("#filtro-nombre").addEventListener("input", aplicarFiltros);
document.querySelector("#filtro-estado").addEventListener("change", aplicarFiltros);
document.querySelector("#filtro-especie").addEventListener("change", aplicarFiltros);

obtenerPersonajes().then(function (datos) {
  personajes = datos;
  aplicarFiltros();
});

const botonOrdenar = document.querySelector("#ordenar");

botonOrdenar.addEventListener("click", function () {
   personajes = ordenarPersonajes(personajes);
   aplicarFiltros(); //Actualizar pantalla
    
});

const botonPrimerosDiez = document.querySelector("#diezPrimeros");

botonPrimerosDiez.addEventListener("click", function () {
   mostrar10 = true;
   aplicarFiltros(); //Actualizar pantalla
    
});

const botonlimpiar = document.querySelector("#limpiar");

botonlimpiar.addEventListener("click", function () {
  document.querySelector("#filtro-nombre").value ="";
  document.querySelector("#filtro-estado").value ="";
  document.querySelector("#filtro-especie").value ="";
  mostrar10 = false;
  aplicarFiltros();
    
});



