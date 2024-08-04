// Recupera la categoría seleccionada
const tema = sessionStorage.getItem("tema");
let vidas = 4;
// Función para obtener preguntas desde la API
async function obtenerPreguntas() {
  try {
    const respuesta = await fetch(
      "https://api.jsonbin.io/v3/b/66aecab3acd3cb34a86f8ba5"
    );
    const data = await respuesta.json();
    return data.record.preguntas[tema];
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
  }
}

// Función para mostrar preguntas en la página
async function mostrarPreguntas() {
  const preguntas = await obtenerPreguntas();
  if (!preguntas) return;

  const contenedorPreguntas = document.querySelector(".contenedor-preguntas");
  const contenedorRespuestas = document.querySelector("#contenedor-respuestas");
  const preguntaTexto = document.querySelector("#pregunta-texto");
  const preguntaImagen = document.querySelector("#pregunta-imagen");

  // Inicializa el índice de la pregunta actual
  let indicePregunta = 0;

  // Función para mostrar una pregunta
  function mostrarPregunta(pregunta) {
    preguntaTexto.textContent = pregunta.pregunta;
    contenedorRespuestas.innerHTML = "";

    pregunta.opciones.forEach((opcion, index) => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.addEventListener("click", () => {
        if (opcion === pregunta.respuesta_correcta) {
          alert("Respuesta correcta");
          indicePregunta++;
          if (indicePregunta < preguntas.opciones_unica_respuesta.length) {
            mostrarPregunta(preguntas.opciones_unica_respuesta[indicePregunta]);
          } else {
            preguntaTexto.textContent =
              "¡Felicidades! Has completado el cuestionario.";
            contenedorRespuestas.innerHTML = "";
          }
        } else {
          alert("Respuesta incorrecta");

          //control vidas perdidas

          let vidasactual = --vidas;
          localStorage.setItem("vidas", vidasactual);
          console.log("vidas" + vidas);
          document.getElementById("vidas").innerHTML = vidasactual;
          if (vidasactual <= 0) {
            alert("Perdiste tus vidas");
            window.location.href = "/Views/main.html";
            vidasactual = 4;
          }
        }
      });
      contenedorRespuestas.appendChild(boton);
    });
  }

  // Muestra la primera pregunta
  mostrarPregunta(preguntas.opciones_unica_respuesta[indicePregunta]);
}

mostrarPreguntas();

function close() {
  window.location.href = "/Views/main.html";
  vidas = localStorage.getItem("vidas");
  console.log("vidas" + vidas);
}
