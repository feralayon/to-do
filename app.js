/* ----   ESTADO GLOBAL DE LA APLICACION ------ */

let listaDeTareas = [];
let identificadorUnicoDeTarea = 0;

/* ------REFERENCIAS A ELEMENTOS DEL HTML---- */

const campoTextoTarea = document.getElementById("campoTextoTarea");
const selectorCategoria = document.getElementById("selectorCategoria");
const campoOtraCategoria = document.getElementById("campoOtraCategoria");
const botonAgregarTarea = document.getElementById("botonAgregarTarea");
const mensajeError = document.getElementById("mensajeError");
const listaVisualDeTareas = document.getElementById("listaVisualDeTareas");
const numeroTareasCompletadas = document.getElementById("numeroTareasCompletadas");
const numeroTotalTareas = document.getElementById("numeroTotalTareas");

/* ------MENSAJES DE CONSOLA INICIALES------ */

console.log("TASK MANAGER se inició correctamente");
console.log("El DOM ya fue encadenado");
console.log("Lista de tareas lista:", listaDeTareas);

/* -----MOSTRAR U OCULTAR CAMPO DE OTRA CATEGORIA------ */

function mostrarUOcultarCampoOtraCategoria() {
  if (selectorCategoria.value === "other") {
    campoOtraCategoria.style.display = "block";
  } else {
    campoOtraCategoria.style.display = "none";
    campoOtraCategoria.value = "";
  }
}

/* ------MANEJO DE ERROR EN PANTALLA------ */

function mostrarMensajeDeError(textoDelError) {
  mensajeError.textContent = textoDelError;
}

function limpiarMensajeDeError() {
  mensajeError.textContent = "";
}

/* ------OBTENER DATOS DE CATEGORIA-------- */

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

/* -------AGREGAR NUEVA TAREA AL ESTADO------- */

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
}

/* ------FUNCIÓN TEMPORAL PARA EVITAR ERROR DEL onclick------ */

/* function eliminarTodasLasTareasCompletadas() {
  console.log("Todavía no se implementa limpiar completadas en el bloque 2");
}

/* -----FUNCIONA GRGAR TAREA "LO PRINCIPAL" ------- */

botonAgregarTarea.addEventListener("click", agregarNuevaTarea);
