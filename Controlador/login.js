// Función para guardar el correo y nombre en localStorage
function guardarcorreo() {
  const nombre = document.getElementById("registrar_nombre").value.trim(); // .trim() para eliminar espacios en blanco
  const correo = document.getElementById("registrar_correo").value.trim(); // .trim() para eliminar espacios en blanco

  if (!nombre || !correo) {
      alert("No debe dejar campos vacíos");
      return;
  }

  // Obtener los datos existentes de localStorage, si existen
  const almacenado = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si el correo ya está registrado
  const existeCorreo = almacenado.some(usuario => usuario.correo === correo);
  if (existeCorreo) {
      alert("El correo ya está registrado");
      return;
  }

  // Agregar el nuevo usuario al array
  almacenado.push({ nombre: nombre, correo: correo });

  // Guardar el array actualizado en localStorage
  localStorage.setItem("usuarios", JSON.stringify(almacenado));

  alert("Correo registrado");

  // Ocultar el registro y mostrar el login
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// Función para verificar el correo en el inicio de sesión
function ingresar() {
  const correo = document.getElementById("correo").value.trim(); // Elimina espacios en blanco
  if (!correo) {
      alert("Debe ingresar un correo");
      return; // Asegúrate de salir de la función si el correo está vacío
  }

  // Obtener los datos almacenados en localStorage
  const almacenado = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si el correo existe en el array
  const usuario = almacenado.find(usuario => usuario.correo === correo);

  console.log("Correo ingresado:", correo); // Depuración
  console.log("Datos almacenados:", almacenado); // Depuración

  if (usuario) {
      // Guardar el usuario actual en sessionStorage
      sessionStorage.setItem("usuarioActual", JSON.stringify(usuario));
      window.location.href = "../../Views/main.html";
  } else {
      alert("Correo no registrado");
  }
}

// Mostrar registro al hacer clic en "inscribirse"
document.getElementById("ingresar").addEventListener("click", () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "block";
});
