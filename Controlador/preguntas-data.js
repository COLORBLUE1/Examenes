// Recupera la categoría seleccionada
const tema = sessionStorage.getItem("tema");
let vidas = 4;
let seleccionada = null; // Variable para almacenar la opción seleccionada

// Función para obtener preguntas desde la API
async function obtenerPreguntas() {
  try {
    const respuesta = await fetch(
      "https://api.jsonbin.io/v3/b/66aecab3acd3cb34a86f8ba5"
    );
    const data = await respuesta.json();
    const preguntasPorTema = data.record.preguntas[tema];

    // Combina todas las categorías en una sola lista de preguntas
    let todasLasPreguntas = [];

    // Si hay preguntas en la categoría actual, añádelas
    if (preguntasPorTema) {
      Object.keys(preguntasPorTema).forEach(tipo => {
        todasLasPreguntas = todasLasPreguntas.concat(preguntasPorTema[tipo]);
      });
    }

    // Mezcla aleatoriamente las preguntas
    todasLasPreguntas = todasLasPreguntas.sort(() => Math.random() - 0.5);

    return todasLasPreguntas;
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    return [];
  }
}

// Función para actualizar la barra de progreso
function actualizarProgreso(indicePregunta, totalPreguntas) {
  const progreso = ((indicePregunta + 1) / totalPreguntas) * 100;
  const barraProgreso = document.getElementById("progreso-barra");
  barraProgreso.style.width = `${progreso}%`;

  // Guarda el progreso en localStorage
  localStorage.setItem(`${tema}-progreso`, progreso);

  // Actualiza la barra de progreso circular
  const barraProgresoCircular = document.getElementById("barra-progreso-circular");
  const grados = (progreso / 100) * 360;
  barraProgresoCircular.style.transform = `rotate(${grados}deg)`;
}

// Función para mostrar preguntas en la página
async function mostrarPreguntas() {
  const preguntas = await obtenerPreguntas();
  if (!preguntas || preguntas.length === 0) return;

  const contenedorPreguntas = document.querySelector(".contenedor-preguntas");
  const contenedorRespuestas = document.querySelector("#contenedor-respuestas");
  const preguntaTexto = document.querySelector("#pregunta-texto");
  const preguntaImagen = document.querySelector("#pregunta-imagen");
  const comprobarBtn = document.getElementById("comprobar-btn");

  // Inicializa el índice de la pregunta actual
  let indicePregunta = 0;
  const totalPreguntas = preguntas.length;

  // Recupera el progreso guardado
  const progresoGuardado = localStorage.getItem(`${tema}-progreso`);
  if (progresoGuardado) {
    const progreso = parseFloat(progresoGuardado);
    const indiceGuardado = Math.floor((progreso / 100) * totalPreguntas);
    indicePregunta = Math.max(indiceGuardado, 0);
  }

  // Función para mostrar una pregunta
  function mostrarPregunta(pregunta) {
    preguntaTexto.textContent = pregunta.pregunta || "Pregunta sin texto";
    preguntaImagen.src = pregunta.imagen || "/Assets/Archivos/img/personajes/personaje-1.svg";
    preguntaImagen.style.display = 'block';

    contenedorRespuestas.innerHTML = "";

    // Habilitar el botón de comprobar
    comprobarBtn.disabled = true;
    comprobarBtn.textContent = "Comprobar";

    pregunta.opciones.forEach((opcion) => {
      const boton = document.createElement("button");
      boton.textContent = opcion;
      boton.addEventListener("click", () => {
        seleccionada = opcion; // Almacena la opción seleccionada
        comprobarBtn.disabled = false; // Habilita el botón de comprobar
      });
      contenedorRespuestas.appendChild(boton);
    });

    // Maneja el evento click en el botón comprobar
    comprobarBtn.addEventListener("click", comprobarRespuesta);

    function comprobarRespuesta() {
      if (seleccionada === pregunta.respuesta_correcta) {
        alert("Respuesta correcta");
        comprobarBtn.textContent = "Continuar";
        comprobarBtn.removeEventListener("click", comprobarRespuesta);
        comprobarBtn.addEventListener("click", () => {
          indicePregunta++;
          if (indicePregunta < preguntas.length) {
            mostrarPregunta(preguntas[indicePregunta]);
            comprobarBtn.textContent = "Comprobar";
            seleccionada = null;
            comprobarBtn.disabled = true;
          } else {
            preguntaTexto.textContent = "¡Felicidades! Has completado el cuestionario.";
            contenedorRespuestas.innerHTML = "";
            comprobarBtn.style.display = "none";
          }
          actualizarProgreso(indicePregunta, totalPreguntas);
        });
      } else {
        alert("Respuesta incorrecta");

        // Control vidas perdidas
        let vidasActuales = --vidas;
        localStorage.setItem("vidas", vidasActuales);
        document.getElementById("vidas").innerHTML = localStorage.getItem("vidas");
        if (vidasActuales <= 0) {
          alert("Perdiste tus vidas");
          window.location.href = "/Views/main.html";
          localStorage.setItem("vidas", "4");
        }
      }
    }
  }

  // Muestra la primera pregunta
  if (preguntas[indicePregunta]) {
    mostrarPregunta(preguntas[indicePregunta]);
  } else {
    console.error("No se pudo encontrar una pregunta en el índice inicial.");
  }

  // Inicializa la barra de progreso
  actualizarProgreso(indicePregunta, totalPreguntas);
}

mostrarPreguntas();

function closebotton() {
  window.location.href = "/Views/main.html";
  document.getElementById("vidas").innerHTML = localStorage.getItem("vidas");
}
