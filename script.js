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


let personajes = [];

function aplicarFiltros() {
  const nombre = document.querySelector("#filtro-nombre").value.trim().toLowerCase();
  const estado = document.querySelector("#filtro-estado").value;
  const especie = document.querySelector("#filtro-especie").value;

  let filtrados = filtrarPorEstado(personajes, estado);
  filtrados = filtrarPorEspecie(filtrados, especie);
  filtrados = filtrados.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(nombre);
  });

  pintarResultados(filtrados);
}

function pintarResultados(lista) {
  const contenedor = document.querySelector("#resultados");
  document.querySelector("#contador").textContent = lista.length + " personajes encontrados";

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