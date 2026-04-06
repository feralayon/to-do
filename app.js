/* ------------ESTADO GLOBAL DE LA APLICACION---------*/

let listaDeTareas = [];
let identificadorUnicoDeTarea = 0;

/* ------REFERENCIAS A ELEMENTOS DEL HTML------ */

const campoTextoTarea = document.getElementById("campoTextoTarea");
const selectorCategoria = document.getElementById("selectorCategoria");
const campoOtraCategoria = document.getElementById("campoOtraCategoria");
const botonAgregarTarea = document.getElementById("botonAgregarTarea");
const mensajeError = document.getElementById("mensajeError");
const listaVisualDeTareas = document.getElementById("listaVisualDeTareas");
const numeroTareasCompletadas = document.getElementById("numeroTareasCompletadas");
const numeroTotalTareas = document.getElementById("numeroTotalTareas");

/* ------MENSAJES DE CONSOLA INICIALES------ */

console.log("La aplicación de tareas se inició correctamente");
console.log("Los elementos del DOM ya fueron capturados");
console.log("Estado inicial de la lista de tareas:", listaDeTareas);

/* ------MOSTRAR U OCULTAR CAMPO DE OTRA CATEGORIA------ */

function mostrarUOcultarCampoOtraCategoria() {
  if (selectorCategoria.value === "other") {
    campoOtraCategoria.style.display = "block";
  } else {
    campoOtraCategoria.style.display = "none";
    campoOtraCategoria.value = "";
  }
}

/* ----------MENSAJES DE ERROR--------- */

function mostrarMensajeDeError(textoDelError) {
  mensajeError.textContent = textoDelError;
}

function limpiarMensajeDeError() {
  mensajeError.textContent = "";
}

/* -------OBTENER DATOS DE LA CATEGORÍA SELECCIONADA------- */

function obtenerDatosDeLaCategoriaSeleccionada() {
  if (selectorCategoria.value === "💼 Trabajo") {
    return { emojiDeCategoria: "💼", nombreDeCategoria: "Trabajo" };
  }

  if (selectorCategoria.value === "📚 Estudio") {
    return { emojiDeCategoria: "📚", nombreDeCategoria: "Estudio" };
  }

  if (selectorCategoria.value === "🏠 Personal") {
    return { emojiDeCategoria: "🏠", nombreDeCategoria: "Personal" };
  }

  if (selectorCategoria.value === "🔴 Urgente") {
    return { emojiDeCategoria: "🔴", nombreDeCategoria: "Urgente" };
  }

  if (selectorCategoria.value === "other") {
    const textoCategoriaPersonalizada = campoOtraCategoria.value.trim();

    if (textoCategoriaPersonalizada === "") {
      return { emojiDeCategoria: "🏷️", nombreDeCategoria: "Sin categoría" };
    }

    return {
      emojiDeCategoria: "🏷️",
      nombreDeCategoria: textoCategoriaPersonalizada
    };
  }

  return { emojiDeCategoria: "📌", nombreDeCategoria: "General" };
}

/* ------ACTUALIZAR CONTADOR------ */

function actualizarContadorDeTareas() {
  let cantidadDeTareasCompletadas = 0;

  for (let posicion = 0; posicion < listaDeTareas.length; posicion++) {
    if (listaDeTareas[posicion].estaCompletada) {
      cantidadDeTareasCompletadas++;
    }
  }

  numeroTareasCompletadas.textContent = cantidadDeTareasCompletadas;
  numeroTotalTareas.textContent = listaDeTareas.length;
}

/* -------CAMBIAR ESTADO DE COMPLETADA------- */

function cambiarEstadoDeTareaCompletada(idDeLaTarea) {
  for (let posicion = 0; posicion < listaDeTareas.length; posicion++) {
    if (listaDeTareas[posicion].id === idDeLaTarea) {
      listaDeTareas[posicion].estaCompletada =
        !listaDeTareas[posicion].estaCompletada;

      console.log("Se cambió el estado de completada:", listaDeTareas[posicion]);
    }
  }

  mostrarTareasEnPantalla();
  actualizarContadorDeTareas();
}

/* --------CAMBIAR ESTADO DE URGENTE------- */

function cambiarEstadoDeTareaUrgente(idDeLaTarea) {
  for (let posicion = 0; posicion < listaDeTareas.length; posicion++) {
    if (listaDeTareas[posicion].id === idDeLaTarea) {
      listaDeTareas[posicion].esUrgente =
        !listaDeTareas[posicion].esUrgente;

      console.log("Se cambió el estado de urgente:", listaDeTareas[posicion]);
    }
  }

  mostrarTareasEnPantalla();
}

/* --------ELIMINAR UNA TAREA---------- */

function eliminarUnaTarea(idDeLaTarea) {
  const usuarioConfirmoLaEliminacion = confirm(
    "¿Seguro que quieres eliminar esta tarea?"
  );

  if (usuarioConfirmoLaEliminacion) {
    let nuevaListaDeTareas = [];

    for (let posicion = 0; posicion < listaDeTareas.length; posicion++) {
      if (listaDeTareas[posicion].id !== idDeLaTarea) {
        nuevaListaDeTareas.push(listaDeTareas[posicion]);
      }
    }

    listaDeTareas = nuevaListaDeTareas;

    console.log("La tarea fue eliminada. Estado actual:", listaDeTareas);

    mostrarTareasEnPantalla();
    actualizarContadorDeTareas();
  }
}

/* -------MOSTRAR TAREAS EN PANTALLA------- */

function mostrarTareasEnPantalla() {
  listaVisualDeTareas.textContent = "";

  for (let posicion = 0; posicion < listaDeTareas.length; posicion++) {
    const tareaActual = listaDeTareas[posicion];

    const elementoLiDeLaTarea = document.createElement("li");
    elementoLiDeLaTarea.classList.add("elemento-visual-individual-de-una-tarea");

    if (tareaActual.estaCompletada) {
      elementoLiDeLaTarea.classList.add("estado-visual-de-tarea-completada");
    } else {
      elementoLiDeLaTarea.classList.remove("estado-visual-de-tarea-completada");
    }

    if (tareaActual.esUrgente) {
      elementoLiDeLaTarea.classList.add("estado-visual-de-tarea-urgente");
    } else {
      elementoLiDeLaTarea.classList.remove("estado-visual-de-tarea-urgente");
    }

    const contenedorDelContenidoPrincipalDeLaTarea = document.createElement("div");
    contenedorDelContenidoPrincipalDeLaTarea.classList.add("contenedor-del-contenido-principal-de-la-tarea");

    const spanDelEmojiDeLaCategoria = document.createElement("span");
    spanDelEmojiDeLaCategoria.classList.add("texto-visual-del-emoji-de-la-categoria");
    spanDelEmojiDeLaCategoria.textContent = tareaActual.emojiDeCategoria;

    const spanDelTextoDeLaTarea = document.createElement("span");
    spanDelTextoDeLaTarea.classList.add("texto-descriptivo-de-la-tarea");
    spanDelTextoDeLaTarea.textContent =
      tareaActual.textoDeLaTarea + " (" + tareaActual.nombreDeCategoria + ")";

    if (tareaActual.estaCompletada) {
      spanDelTextoDeLaTarea.classList.add("texto-de-tarea-marcada-como-completada");
    } else {
      spanDelTextoDeLaTarea.classList.remove("texto-de-tarea-marcada-como-completada");
    }

    contenedorDelContenidoPrincipalDeLaTarea.appendChild(spanDelEmojiDeLaCategoria);
    contenedorDelContenidoPrincipalDeLaTarea.appendChild(spanDelTextoDeLaTarea);

    const contenedorDeBotonesDeAccionDeCadaTarea = document.createElement("div");
    contenedorDeBotonesDeAccionDeCadaTarea.classList.add("contenedor-de-botones-de-accion-de-cada-tarea");

    const botonMarcarComoHecha = document.createElement("button");
    botonMarcarComoHecha.textContent = "Hecha";
    botonMarcarComoHecha.onclick = function () {
      cambiarEstadoDeTareaCompletada(tareaActual.id);
    };

    const botonMarcarComoUrgente = document.createElement("button");
    botonMarcarComoUrgente.textContent = "Urgente";
    botonMarcarComoUrgente.onclick = function () {
      cambiarEstadoDeTareaUrgente(tareaActual.id);
    };

    const botonEliminarTarea = document.createElement("button");
    botonEliminarTarea.textContent = "Eliminar";
    botonEliminarTarea.onclick = function () {
      eliminarUnaTarea(tareaActual.id);
    };

    contenedorDeBotonesDeAccionDeCadaTarea.appendChild(botonMarcarComoHecha);
    contenedorDeBotonesDeAccionDeCadaTarea.appendChild(botonMarcarComoUrgente);
    contenedorDeBotonesDeAccionDeCadaTarea.appendChild(botonEliminarTarea);

    elementoLiDeLaTarea.appendChild(contenedorDelContenidoPrincipalDeLaTarea);
    elementoLiDeLaTarea.appendChild(contenedorDeBotonesDeAccionDeCadaTarea);

    listaVisualDeTareas.appendChild(elementoLiDeLaTarea);
  }

  console.log("Se renderizaron las tareas en pantalla");
}

/* ------AGREGAR NUEVA TAREA------ */

function agregarNuevaTarea() {
  const textoDeLaNuevaTarea = campoTextoTarea.value.trim();

  if (textoDeLaNuevaTarea === "") {
    mostrarMensajeDeError("Por favor escribe una tarea antes de agregar.");
    return;
  }

  limpiarMensajeDeError();

  const datosDeCategoria = obtenerDatosDeLaCategoriaSeleccionada();

  const nuevaTarea = {
    id: identificadorUnicoDeTarea,
    textoDeLaTarea: textoDeLaNuevaTarea,
    emojiDeCategoria: datosDeCategoria.emojiDeCategoria,
    nombreDeCategoria: datosDeCategoria.nombreDeCategoria,
    estaCompletada: false,
    esUrgente: false
  };

  listaDeTareas.push(nuevaTarea);
  identificadorUnicoDeTarea++;

  console.log("Se agregó una nueva tarea:", nuevaTarea);
  console.log("Estado actual de la lista:", listaDeTareas);

  campoTextoTarea.value = "";
  selectorCategoria.value = "";
  campoOtraCategoria.value = "";
  campoOtraCategoria.style.display = "none";

  mostrarTareasEnPantalla();
  actualizarContadorDeTareas();
}

/* -------FUNCION TEMPORAL PARA EVITAR ERROR DEL onclick------ */

function eliminarTodasLasTareasCompletadas() {
  console.log("Todavía no se implementa limpiar completadas en el bloque 4");
}

/* -----FUNCIONA GRGAR TAREA "LO PRINCIPAL" ------- */

botonAgregarTarea.addEventListener("click", agregarNuevaTarea);
