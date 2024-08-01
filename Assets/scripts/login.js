//pasar de login a registrarse

document.addEventListener("DOMContentLoaded", () => {
  const ingresarBtn = document.getElementById("ingresar");
  const loginSection = document.getElementById("login");
  const registroSection = document.getElementById("registro");
  const volverLoginBtn = document.getElementById("volver-login");

  // Función para mostrar la sección de registro y ocultar la de login
  function mostrarRegistro() {
    loginSection.classList.add("hide");
    // Espera a que la animación de ocultamiento termine antes de mostrar la sección de registro
    setTimeout(() => {
      registroSection.classList.add("show");
    }, 500); // 500ms debe ser igual al tiempo de transición en CSS
  }
  // Agrega el manejador de eventos para el botón "inscribirse"
  if (ingresarBtn) {
    ingresarBtn.addEventListener("click", (event) => {
      // Muestra la sección de registro y oculta la sección de login
      registroSection.style.display = "flex";
      loginSection.style.display = "none";
      event.preventDefault(); // Evita que el enlace navegue a otra página
      mostrarRegistro();
    });
  }
});

//guardar correo

function guardarcorreo() {
  const correo = document.getElementById("registrar_correo").value.trim();
  localStorage.setItem("correo", correo);

  if (!correo) {
    alert("Debe ingresar un correo");
    document.getElementById("registro").classList.add("show");
    document.getElementById("login").classList.add("hide");
  } else {
    document.getElementById("registro").classList.add("hide");
    document.getElementById("login").classList.add("show");
    alert("Correo registrado");
  }
}


function ingresar() {
  const correo = document.getElementById("correo").value.trim(); // .trim() para eliminar espacios en blanco

  if (!correo) {
    alert("Debe ingresar un correo");
  } else {
    const almacenado = localStorage.getItem("correo");

    if (correo === almacenado) {
      alert("Ingresando");
      window.location.href = "https://www.example.com"; 
    } else {
      alert("Correo no registrado");
    }
  }
}
